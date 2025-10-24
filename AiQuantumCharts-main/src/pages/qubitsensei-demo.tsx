import React from "react";
import { SenseiPanel } from "../qubitsensei/SenseiPanel";
import { useSensei } from "../qubitsensei/useSensei";

export default function QubitSenseiDemo() {
  const { messages, send, loading } = useSensei();
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-2xl h-[600px] shadow-2xl rounded-lg overflow-hidden border border-cyan-400 flex">
        <SenseiPanel onSend={send} messages={messages} loading={loading} />
      </div>
    </div>
  );
}
