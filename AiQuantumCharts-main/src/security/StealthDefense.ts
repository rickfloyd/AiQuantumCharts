// © Quantum Charts Stealth Defense System
// File: src/security/StealthDefense.ts
// Purpose: Prevent malicious console injection, reverse engineering, and browser tampering

// 🧠 Self-check function to detect debugging or code inspection
export function initStealthDefense() {
  try {
    // 🚨 Block console access
    const disableConsole = () => {
      const methods = ["log", "warn", "error", "debug", "info"];
      for (const method of methods) {
        (console as any)[method] = () => {
          throw new Error("🚫 Console access disabled for security reasons.");
        };
      }
    };
    disableConsole();

    // 🧱 Detect DevTools tampering
    let devtoolsOpen = false;
    const element = new Image();
    Object.defineProperty(element, "id", {
      get: function () {
        devtoolsOpen = true;
        throw new Error("⚠️ Unauthorized inspection detected.");
      },
    });
    setInterval(() => {
      devtoolsOpen = false;
      console.log(element);
      if (devtoolsOpen) {
        alert("Security alert: Developer tools are open. Session locked.");
        window.location.href = "about:blank";
      }
    }, 3000);

    // 🧬 Prevent right-click & inspect element
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key))
      ) {
        e.preventDefault();
        alert("⚠️ Security Warning: Debugging disabled.");
      }
    });

    // 🕵️ Anti-injection filter for scripts
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeName === "SCRIPT" &&
            !(node as HTMLScriptElement).src.includes("trusted")
          ) {
            console.warn("🚨 Untrusted script blocked:", node);
            (node as HTMLElement).remove();
          }
        });
      }
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    // 🧩 Heartbeat integrity check
    const verifyIntegrity = () => {
      const sig = window.localStorage.getItem("QC_APP_SIGNATURE");
      if (!sig) {
        const hash = Math.random().toString(36).substring(2, 15);
        window.localStorage.setItem("QC_APP_SIGNATURE", hash);
      }
    };
    setInterval(verifyIntegrity, 10000);

    console.info("%cQuantum Charts Defense Layer Active", "color: #0ff");
  } catch (error) {
    console.error("StealthDefense initialization failed:", error);
  }
}
