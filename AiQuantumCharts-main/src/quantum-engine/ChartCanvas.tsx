// Quantum Performance Engine: Canvas Chart Wrapper
// Uses lightweight-charts for fast rendering
import React, { useEffect, useRef, useState } from "react";
import { createChart, IChartApi, LineData } from "lightweight-charts";
import { MT4BridgePanel } from "./MT4BridgePanel";

export interface ChartCanvasProps {
  data: LineData[];
}

export const ChartCanvas: React.FC<ChartCanvasProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);
  const seriesRef = useRef<any>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [collabData, setCollabData] = useState<LineData[]>(data);

  // WebSocket connection for real-time collaboration
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5050');
    wsRef.current = ws;
    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'init' || msg.type === 'update') {
          setCollabData(msg.data);
        }
      } catch {}
    };
    return () => ws.close();
  }, []);

  // Chart rendering and update
  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      chartInstance.current = createChart(chartRef.current, {
        width: 600,
        height: 400,
        layout: { background: { color: '#111' }, textColor: '#fff' },
        grid: { vertLines: { color: '#222' }, horzLines: { color: '#222' } },
      });
  // Use addLineSeries() and cast to any to bypass type error
  seriesRef.current = (chartInstance.current as any).addLineSeries();
      seriesRef.current.setData(collabData);
    }
    return () => {
      chartInstance.current?.remove();
      chartInstance.current = null;
      seriesRef.current = null;
    };
    // Only run on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update chart when collabData changes
  useEffect(() => {
    if (seriesRef.current) {
      seriesRef.current.setData(collabData);
    }
  }, [collabData]);

  // Example: broadcast chart changes (replace with real edit events)
  // useEffect(() => {
  //   if (wsRef.current && wsRef.current.readyState === 1) {
  //     wsRef.current.send(JSON.stringify({ type: 'update', data: collabData }));
  //   }
  // }, [collabData]);

  return (
    <div>
      <MT4BridgePanel />
      <div ref={chartRef} />
      {/* Add UI for collaborative editing here */}
    </div>
  );
};
