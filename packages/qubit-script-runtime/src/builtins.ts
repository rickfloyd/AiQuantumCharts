import { DataSeries } from "./series";

/**
 * Calculates the Simple Moving Average.
 * @param source The data series to calculate the SMA on.
 * @param length The number of bars to average.
 * @returns A new DataSeries containing the SMA values.
 */
export function sma(source: DataSeries, length: number): DataSeries {
  const smaValues: number[] = [];
  for (let i = 0; i < source.values.length; i++) {
    if (i < length - 1) {
      smaValues.push(NaN); // Not enough data yet
    } else {
      let sum = 0;
      for (let j = 0; j < length; j++) {
        sum += source.values[i - j];
      }
      smaValues.push(sum / length);
    }
  }
  return new DataSeries(smaValues);
}