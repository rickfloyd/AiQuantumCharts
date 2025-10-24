// Quantum Performance Engine: Indicator Worker (Web Worker)
// Computes heavy TA indicators off the main thread

self.onmessage = function(e) {
  const { candles, type } = e.data;
  let result;
  if (type === 'ema') {
    result = calculateEMA(candles, e.data.period);
  }
  // Add more indicators as needed
  self.postMessage({ type, result });
};

function calculateEMA(candles, period = 14) {
  let k = 2 / (period + 1);
  let emaArray = [];
  let ema = candles[0].close;
  for (let i = 0; i < candles.length; i++) {
    ema = candles[i].close * k + ema * (1 - k);
    emaArray.push(ema);
  }
  return emaArray;
}
