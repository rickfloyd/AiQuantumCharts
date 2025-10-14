import React, { useEffect, useMemo, useRef, useState } from "react";
import axios, { AxiosError } from "axios";

/**
 * Friends.tsx
 * -----------------------------------------------------------
 * Cross-platform friends list + secure chat with text & attachments.
 * - Shows a consent banner (must accept before sending/attaching)
 * - Posts ALL messages to your secure vault endpoint:
 *     http://localhost:3000/vault/messages
 * - Pulls friends from:  http://localhost:3000/api/friends/all
 * - Pulls chat history from (optional):  http://localhost:3000/vault/messages?roomId=...
 *   (If your backend doesn't have this yet, the UI will still work for sending.)
 * - Includes an admin-only "Open Vault" button if `userIsAdmin` is true.
 *
 * Legal/Compliance: The component displays a clear disclosure and requires
 * explicit consent before enabling messaging or file uploads (GDPR/LGPD/POPIA/AU).
 */

// -------- CONFIG --------
const API_BASE = "http://localhost:3000";
const FRIENDS_ENDPOINT = `${API_BASE}/api/friends/all`;
const VAULT_SEND_ENDPOINT = `${API_BASE}/vault/messages`;
const VAULT_FETCH_ENDPOINT = `${API_BASE}/vault/messages`; // GET ?roomId=...

// If you already know the logged-in user's info, you can pass it via props.
// For now, we derive a basic user stub from localStorage token presence.
const getLoggedInUser = () => {
  const token = localStorage.getItem("token");
  // In a real app, decode token or fetch /me to populate.
  if (token) {
    return { id: "user-1", email: "user@example.com", displayName: "Player One" };
  }
  return null;
};

type Friend = {
  id: string;
  platform: string; // 'xbox' | 'steam' | 'epic' | 'ps' | etc.
  friend_id: string | number;
  friend_name: string;
  status?: string; // online | offline | etc.
};

type ChatMessage = {
  id?: string | number;
  roomId: string;                 // conversation room
  fromUserId: string;             // sender ID
  toUserId?: string;              // optional, if 1:1 chat
  text?: string;
  attachmentUrl?: string;         // (your backend should return a URL if it stores files)
  attachmentName?: string;
  timestamp: string;              // ISO string
  metadata?: Record<string, unknown>; // any extra fields
};

// Build a stable room ID for a pair of users (1:1). You can customize this.
const roomIdFor = (u1: string, u2: string) =>
  [u1, u2].sort().join("__");

/**
 * Consent UI states
 */
enum ConsentState {
  Unknown = "unknown",
  Accepted = "accepted",
  Declined = "declined",
}

/**
 * Small helper to format timestamps nicely
 */
const timeFormat = (iso: string) => {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [friendsError, setFriendsError] = useState<string | null>(null);

  // Selected friend / active chat
  const [activeFriend, setActiveFriend] = useState<Friend | null>(null);

  // Consent banner & attachment-consent
  const [consent, setConsent] = useState<ConsentState>(ConsentState.Unknown);
  const [attachmentConsent, setAttachmentConsent] = useState<ConsentState>(ConsentState.Unknown);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Admin flag (you can wire this to your real user/role system)
  const [userIsAdmin] = useState<boolean>(false); // set true to show Vault button

  // Logged-in user (stub)
  const me = useMemo(() => getLoggedInUser(), []);

  // Scroll to bottom on new messages
  const listRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Load friends
  useEffect(() => {
    const load = async () => {
      setLoadingFriends(true);
      setFriendsError(null);
      try {
        const res = await axios.get(FRIENDS_ENDPOINT);
        setFriends(res.data || []);
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        setFriendsError(error?.response?.data?.error || (err as Error).message || "Failed to load friends.");
      } finally {
        setLoadingFriends(false);
      }
    };
    load();
  }, []);

  // Build a room ID for conversation (1:1) when a friend is selected
  const roomId = useMemo(() => {
    if (!me || !activeFriend) return "";
    return roomIdFor(String(me.id), String(activeFriend.friend_id));
  }, [me, activeFriend]);

  // Load existing messages (if your backend supports it)
  useEffect(() => {
    if (!roomId) return;
    const fetchMessages = async () => {
      setChatLoading(true);
      setChatError(null);
      try {
        const res = await axios.get(VAULT_FETCH_ENDPOINT, { params: { roomId } });
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch {
        // If your backend doesn't implement GET yet, we fail silently and allow sending.
        setMessages([]);
      } finally {
        setChatLoading(false);
      }
    };
    fetchMessages();
  }, [roomId]);

  // Consent persistence (optional): store acceptance in localStorage per user
  useEffect(() => {
    if (!me) return;
    const key = `chat_consent_${me.id}`;
    const val = localStorage.getItem(key);
    if (val === "accepted") setConsent(ConsentState.Accepted);
  }, [me]);

  const persistConsent = () => {
    if (!me) return;
    localStorage.setItem(`chat_consent_${me.id}`, "accepted");
  };

  // Attachment consent (separate, shown when attempting to add a file)
  useEffect(() => {
    if (!me) return;
    const key = `chat_attach_consent_${me.id}`;
    const val = localStorage.getItem(key);
    if (val === "accepted") setAttachmentConsent(ConsentState.Accepted);
  }, [me]);

  const persistAttachmentConsent = () => {
    if (!me) return;
    localStorage.setItem(`chat_attach_consent_${me.id}`, "accepted");
  };

  const onPickFriend = (f: Friend) => {
    setActiveFriend(f);
    setText("");
    setFile(null);
    // Reset per-entry chat errors
    setChatError(null);
  };

  const canSend = useMemo(() => {
    return consent === ConsentState.Accepted && !!me && !!activeFriend && !!roomId;
  }, [consent, me, activeFriend, roomId]);

  const onChooseFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (attachmentConsent !== ConsentState.Accepted) {
      // Ask for attachment consent first
      alert(
        "File uploads are logged to the Secure Vault along with your messages for safety and legal compliance."
      );
      setAttachmentConsent(ConsentState.Unknown); // show banner below
    }
    setFile(e.target.files[0]);
  };

  const sendMessage = async () => {
    if (!canSend) {
      setChatError("You must accept the consent notice before sending.");
      return;
    }
    if (!text && !file) {
      setChatError("Type a message or attach a file first.");
      return;
    }

    try {
      setChatError(null);
      const form = new FormData();

      // Required metadata for the vault
      form.append("roomId", roomId);
      form.append("fromUserId", String(me!.id));
      form.append("fromDisplayName", me!.displayName || me!.email || "Unknown");
      form.append("toUserId", String(activeFriend!.friend_id));
      form.append("toDisplayName", activeFriend!.friend_name);
      form.append("timestamp", new Date().toISOString());

      if (text) form.append("text", text);
      if (file) form.append("attachment", file, file.name);

      // Optional: include platform context & any extra metadata
      form.append("platform", activeFriend!.platform);
      form.append("uiClient", "gaming_builds_frontend");

      // JWT if available (your backend can verify)
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      await axios.post(VAULT_SEND_ENDPOINT, form, { headers });

      // Optimistic UI append
      const newMsg: ChatMessage = {
        roomId,
        fromUserId: String(me!.id),
        toUserId: String(activeFriend!.friend_id),
        text: text || undefined,
        attachmentName: file?.name,
        timestamp: new Date().toISOString(),
        metadata: { platform: activeFriend!.platform, client: "frontend" },
      };
      setMessages((prev) => [...prev, newMsg]);
      setText("");
      setFile(null);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setChatError(error?.response?.data?.error || (err as Error).message || "Failed to send message.");
    }
  };

  // Simple polling (optional) every 8s to refresh messages if backend supports GET
  useEffect(() => {
    if (!roomId) return;
    const id = setInterval(async () => {
      try {
        const res = await axios.get(VAULT_FETCH_ENDPOINT, { params: { roomId } });
        if (Array.isArray(res.data)) setMessages(res.data);
      } catch {
        /* ignore */
      }
    }, 8000);
    return () => clearInterval(id);
  }, [roomId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {/* LEFT: Friends List */}
      <section className="md:col-span-1 bg-gray-800 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">👥 Friends</h2>
        {loadingFriends ? (
          <p>Loading friends…</p>
        ) : friendsError ? (
          <p className="text-red-400">{friendsError}</p>
        ) : friends.length === 0 ? (
          <p className="text-gray-400">No friends found. Connect your platforms.</p>
        ) : (
          <ul className="space-y-2">
            {friends.map((f) => (
              <li
                key={`${f.platform}:${f.friend_id}`}
                className={`flex items-center justify-between bg-gray-900 rounded-md p-3 hover:bg-gray-700 cursor-pointer ${
                  activeFriend?.friend_id === f.friend_id && activeFriend.platform === f.platform
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                onClick={() => onPickFriend(f)}
              >
                <div>
                  <div className="font-medium">{f.friend_name}</div>
                  <div className="text-xs text-gray-400">
                    {f.platform.toUpperCase()} • {f.status || "unknown"}
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded bg-gray-700`}>
                  {f.status || "N/A"}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Admin: Open Vault */}
        {userIsAdmin && (
          <a
            href="/vault"
            className="mt-4 inline-block text-center w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md"
          >
            🔑 Open Vault (Admin)
          </a>
        )}
      </section>

      {/* RIGHT: Chat Area */}
      <section className="md:col-span-2 bg-gray-800 rounded-lg p-4">
        {!activeFriend ? (
          <div className="text-center text-gray-400 py-20">
            Select a friend to start a conversation.
          </div>
        ) : (
          <>
            <header className="flex items-center justify-between mb-4 border-b border-gray-700 pb-3">
              <div>
                <h3 className="text-xl font-semibold">{activeFriend.friend_name}</h3>
                <p className="text-xs text-gray-400">
                  {activeFriend.platform.toUpperCase()} • {activeFriend.status || "unknown"}
                </p>
              </div>

              {/* Consent Status */}
              <div className="text-right">
                <div className="text-xs uppercase tracking-wide text-gray-400">Consent</div>
                <div
                  className={`text-sm ${
                    consent === ConsentState.Accepted ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {consent === ConsentState.Accepted ? "Accepted" : "Required"}
                </div>
              </div>
            </header>

            {/* CONSENT BANNER (must accept) */}
            {consent !== ConsentState.Accepted && (
              <div className="bg-yellow-900/40 border border-yellow-700 rounded-md p-3 mb-4">
                <p className="text-sm">
                  ⚠️ <strong>Safety & Compliance Notice:</strong> Messages and attachments in this
                  chat are <u>logged to a Secure Vault</u> for safety and legal compliance
                  (GDPR/LGPD/POPIA/AU). By continuing, you acknowledge and consent to monitoring,
                  storage, and review as needed.
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                    onClick={() => {
                      setConsent(ConsentState.Accepted);
                      persistConsent();
                    }}
                  >
                    I Understand
                  </button>
                  <button
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
                    onClick={() => setConsent(ConsentState.Declined)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* MESSAGE LIST */}
            <div
              ref={listRef}
              className="h-[48vh] overflow-y-auto bg-gray-900 rounded-md p-3 space-y-3"
            >
              {chatLoading && <p className="text-gray-400">Loading conversation…</p>}
              {!chatLoading && messages.length === 0 && (
                <p className="text-gray-500 text-center mt-6">
                  No messages yet. Start the conversation!
                </p>
              )}
              {messages.map((m, idx) => {
                const mine = m.fromUserId === String(me?.id);
                return (
                  <div
                    key={m.id || idx}
                    className={`max-w-[80%] rounded-md px-3 py-2 ${
                      mine ? "bg-blue-700 ml-auto text-white" : "bg-gray-700 text-white"
                    }`}
                    style={{ wordBreak: "break-word" }}
                  >
                    <div className="text-xs opacity-80">
                      {mine ? "You" : activeFriend.friend_name} • {timeFormat(m.timestamp)}
                    </div>
                    {!!m.text && <div className="mt-1">{m.text}</div>}
                    {!!m.attachmentName && (
                      <div className="mt-2 text-sm underline">
                        📎 {m.attachmentName}
                        {m.attachmentUrl && (
                          <>
                            {" "}
                            —{" "}
                            <a
                              className="text-white underline"
                              href={m.attachmentUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View
                            </a>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ATTACHMENT CONSENT (shown when they try to attach) */}
            {attachmentConsent !== ConsentState.Accepted && file && (
              <div className="bg-yellow-900/40 border border-yellow-700 rounded-md p-3 my-3">
                <p className="text-sm">
                  ⚠️ <strong>Attachment Notice:</strong> Uploaded files are logged and stored in the
                  Secure Vault with your messages. Do you consent to upload this file?
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                    onClick={() => {
                      setAttachmentConsent(ConsentState.Accepted);
                      persistAttachmentConsent();
                    }}
                  >
                    I Understand
                  </button>
                  <button
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
                    onClick={() => setFile(null)}
                  >
                    Cancel Upload
                  </button>
                </div>
              </div>
            )}

            {/* COMPOSER */}
            <div className="mt-4">
              {chatError && <p className="text-red-400 mb-2">{chatError}</p>}

              <div className="flex items-center gap-2">
                <input
                  className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={
                    consent === ConsentState.Accepted
                      ? "Type a message…"
                      : "Accept consent notice to enable messaging"
                  }
                  disabled={consent !== ConsentState.Accepted}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />

                {/* Attachment input */}
                <label className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md cursor-pointer">
                  📎 Attach
                  <input
                    type="file"
                    className="hidden"
                    disabled={consent !== ConsentState.Accepted}
                    onChange={onChooseFile}
                  />
                </label>

                <button
                  onClick={sendMessage}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-md"
                  disabled={!canSend}
                >
                  Send
                </button>
              </div>

              {/* Chosen file preview */}
              {file && (
                <div className="mt-2 text-sm text-gray-300 flex items-center gap-3">
                  <span>Selected: <strong>{file.name}</strong></span>
                  <button className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded" onClick={() => setFile(null)}>
                    Remove
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Friends;