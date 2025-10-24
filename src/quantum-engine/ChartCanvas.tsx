// Quantum Performance Engine: Canvas Chart Wrapper
// Uses lightweight-charts for fast rendering
import React, { useEffect, useRef } from "react";
import { createChart, IChartApi, LineData } from "lightweight-charts";
import { MT4BridgePanel } from "./MT4BridgePanel";

export interface ChartCanvasProps {
  data: LineData[];
}

export const ChartCanvas: React.FC<ChartCanvasProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      chartInstance.current = createChart(chartRef.current, {
        width: 600,
        height: 400,
        layout: { background: { color: '#111' }, textColor: '#fff' },
        grid: { vertLines: { color: '#222' }, horzLines: { color: '#222' } },
      });
      const series = chartInstance.current.addLineSeries();
      series.setData(data);
    }
    return () => {
      chartInstance.current?.remove();
      chartInstance.current = null;
    };
  }, [data]);

  return (
    <div>
      <MT4BridgePanel />
      <div ref={chartRef} />
    </div>
  );
};
