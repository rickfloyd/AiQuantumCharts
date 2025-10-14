import React, { useState } from "react";

const ConnectController: React.FC = () => {
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Not Connected");

  const connectBluetooth = async () => {
    try {
      setStatus("🔍 Scanning for devices...");
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["battery_service"],
      });
      setDeviceName(device.name || "Unknown Device");
      setStatus("✅ Connected");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to connect");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-center">
      <p className="text-lg mb-2">Status: {status}</p>
      {deviceName && <p className="mb-2">Controller: {deviceName}</p>}
      <button onClick={connectBluetooth}>🔗 Pair Controller</button>
    </div>
  );
};

export default ConnectController;