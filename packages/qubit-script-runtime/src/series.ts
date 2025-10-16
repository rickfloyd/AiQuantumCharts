/**
 * Represents a series of data points over time, e.g., closing prices.
 * For now, it's a simple wrapper around an array of numbers.
 */
export class DataSeries {
  constructor(public values: number[]) {}

  get length(): number {
    return this.values.length;
  }

  // Access the value at a specific index from the end (0 is the current bar, 1 is the previous, etc.)
  get(index: number): number {
    const i = this.values.length - 1 - index;
    if (i < 0 || i >= this.values.length) {
      return NaN; // Not a Number, a common way to handle out-of-bounds access in financial calcs
    }
    return this.values[i];
  }
}