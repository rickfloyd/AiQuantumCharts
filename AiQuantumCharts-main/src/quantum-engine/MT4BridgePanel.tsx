import React from "react";

/**
 * MT4 Webhook Bridge Panel
 * Shows info and a test button for sending a webhook to the bridge.
 */
export const MT4BridgePanel: React.FC = () => {
  const webhookUrl = "http://localhost:8088/mt4-webhook";

  const sendTest = async () => {
    const payload = {
      symbol: "EURUSD",
      action: "BUY",
      price: 1.2345,
      lot: 0.1,
      comment: "Test signal from QuantumCharts UI"
    };
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      alert("Webhook sent! Response: " + JSON.stringify(data));
    } catch (err) {
      alert("Failed to send webhook: " + err);
    }
  };

  return (
    <div className="my-4 p-4 bg-black/70 border border-yellow-400 rounded-xl text-yellow-200">
      <h3 className="text-lg font-bold mb-2">MT4 Webhook Bridge</h3>
      <p className="mb-2 text-sm">
        Send trade signals from MetaTrader 4 (MT4) or any platform to this chart via the QuantumCharts MT4 Webhook Bridge.<br />
        <span className="text-yellow-300">Webhook URL:</span> <code className="bg-gray-900 px-2 py-1 rounded">{webhookUrl}</code>
      </p>
      <button
        className="bg-yellow-500 text-black px-4 py-1 rounded hover:bg-yellow-400 font-semibold"
        onClick={sendTest}
      >
        Send Test Webhook
      </button>
    </div>
  );
};
