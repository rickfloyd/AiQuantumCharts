import { useState, useEffect } from 'react';
import RealAPIService, { CryptoData, MiningData } from '../services/realApiService';

interface MiningCalculatorData {
  coin: string;
  price: number;
  difficulty: number;
  hashRate: number;
  power: number;
  electricityCost: number;
  dailyRevenue: number;
  dailyCost: number;
  dailyProfit: number;
  monthlyProfit: number;
  yearlyProfit: number;
  breakEvenDays: number;
  profitability: number;
}

interface UseCryptoMiningOptions {
  coins?: string[];
  updateInterval?: number;
  enabled?: boolean;
}

export const useCryptoMining = (options: UseCryptoMiningOptions = {}) => {
  const {
    coins = ['bitcoin', 'ethereum', 'litecoin'],
    updateInterval = 60000, // 1 minute
    enabled = true
  } = options;

  const [cryptoData, setCryptoData] = useState<{ [coin: string]: CryptoData }>({});
  const [miningData, setMiningData] = useState<{ [coin: string]: MiningData }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const apiService = RealAPIService.getInstance();

  const fetchCryptoData = async () => {
    if (!enabled) return;

    try {
      const cryptoPromises = coins.map(coin => apiService.getCryptoData(coin));
      const miningPromises = coins.map(coin => apiService.getMiningData(coin));

      const [cryptoResults, miningResults] = await Promise.all([
        Promise.all(cryptoPromises),
        Promise.all(miningPromises)
      ]);

      const newCryptoData: { [coin: string]: CryptoData } = {};
      const newMiningData: { [coin: string]: MiningData } = {};

      cryptoResults.forEach((data: CryptoData, index: number) => {
        newCryptoData[coins[index]] = data;
      });

      miningResults.forEach((data: MiningData, index: number) => {
        newMiningData[coins[index]] = data;
      });

      setCryptoData(newCryptoData);
      setMiningData(newMiningData);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const calculateMiningProfitability = (
    coin: string,
    hashRate: number = 100, // TH/s
    power: number = 3000, // Watts
    electricityCost: number = 0.12 // $/kWh
  ): MiningCalculatorData | null => {
    const crypto = cryptoData[coin];
    const mining = miningData[coin];

    if (!crypto || !mining) return null;

    // Calculate daily revenue
    const networkHashRate = mining.networkHashRate;
    const blockReward = mining.blockReward;
    const blocksPerDay = 86400 / mining.blockTime; // seconds in a day / block time
    const dailyRewards = (hashRate / networkHashRate) * blockReward * blocksPerDay;
    const dailyRevenue = dailyRewards * crypto.price;

    // Calculate daily costs
    const dailyPowerConsumption = (power * 24) / 1000; // kWh
    const dailyCost = dailyPowerConsumption * electricityCost;

    // Calculate profits
    const dailyProfit = dailyRevenue - dailyCost;
    const monthlyProfit = dailyProfit * 30;
    const yearlyProfit = dailyProfit * 365;

    // Calculate break-even (assuming equipment cost of $10,000)
    const equipmentCost = 10000;
    const breakEvenDays = dailyProfit > 0 ? equipmentCost / dailyProfit : Infinity;

    // Calculate profitability percentage
    const profitability = dailyRevenue > 0 ? (dailyProfit / dailyRevenue) * 100 : 0;

    return {
      coin,
      price: crypto.price,
      difficulty: mining.difficulty,
      hashRate,
      power,
      electricityCost,
      dailyRevenue,
      dailyCost,
      dailyProfit,
      monthlyProfit,
      yearlyProfit,
      breakEvenDays,
      profitability,
    };
  };

  const getTopMinableCoins = (): Array<{ coin: string; profitability: number }> => {
    return coins
      .map(coin => ({
        coin,
        profitability: calculateMiningProfitability(coin)?.profitability || 0
      }))
      .sort((a, b) => b.profitability - a.profitability);
  };

  const refreshData = () => {
    setLoading(true);
    fetchCryptoData();
  };

  useEffect(() => {
    if (enabled) {
      fetchCryptoData();
      const interval = setInterval(fetchCryptoData, updateInterval);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, updateInterval, JSON.stringify(coins)]);

  return {
    cryptoData,
    miningData,
    loading,
    error,
    lastUpdated,
    calculateMiningProfitability,
    getTopMinableCoins,
    refreshData,
  };
};

// Hook for real-time mining hardware recommendations
export const useMiningHardware = () => {
  const [hardware] = useState([
    {
      name: 'Antminer S19 Pro',
      algorithm: 'SHA-256',
      hashRate: '110 TH/s',
      power: '3250W',
      efficiency: '29.5 J/TH',
      price: '$8,999',
      roi: '8-12 months',
      coins: ['Bitcoin'],
      availability: 'In Stock',
      rating: 4.8,
    },
    {
      name: 'Antminer L7',
      algorithm: 'Scrypt',
      hashRate: '9.5 GH/s',
      power: '3425W',
      efficiency: '360 J/MH',
      price: '$12,999',
      roi: '6-10 months',
      coins: ['Litecoin', 'Dogecoin'],
      availability: 'Pre-order',
      rating: 4.7,
    },
    {
      name: 'GeForce RTX 4090',
      algorithm: 'Ethash',
      hashRate: '130 MH/s',
      power: '450W',
      efficiency: '3.46 J/MH',
      price: '$1,599',
      roi: '12-18 months',
      coins: ['Ethereum Classic', 'Ravencoin'],
      availability: 'In Stock',
      rating: 4.9,
    },
    {
      name: 'Antminer Z15',
      algorithm: 'Equihash',
      hashRate: '420 KSol/s',
      power: '1510W',
      efficiency: '3.6 J/KSol',
      price: '$4,999',
      roi: '10-14 months',
      coins: ['Zcash'],
      availability: 'Limited',
      rating: 4.5,
    },
  ]);

  const [loading, setLoading] = useState(false);

  const getRecommendedHardware = (budget: number, preferredCoin: string) => {
    return hardware
      .filter(hw => {
        const price = parseInt(hw.price.replace(/[$,]/g, ''));
        return price <= budget && hw.coins.some(coin => 
          coin.toLowerCase().includes(preferredCoin.toLowerCase())
        );
      })
      .sort((a, b) => b.rating - a.rating);
  };

  const updateHardwarePrices = async () => {
    setLoading(true);
    // Simulate API call to update hardware prices
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return {
    hardware,
    loading,
    getRecommendedHardware,
    updateHardwarePrices,
  };
};