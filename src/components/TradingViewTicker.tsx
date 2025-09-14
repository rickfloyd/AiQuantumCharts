import React, { useEffect, useRef } from 'react';
import { TrendingUp, Zap } from 'lucide-react';

const TradingViewTicker: React.FC = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear any existing content
    if (widgetRef.current) {
      widgetRef.current.innerHTML = '';
    }

    // Create the widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container';
    
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetContainer.appendChild(widgetDiv);

    // Create and configure the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: "FOREXCOM:SPXUSD",
          title: "S&P 500"
        },
        {
          proName: "FOREXCOM:NSXUSD", 
          title: "NASDAQ 100"
        },
        {
          proName: "FX_IDC:EURUSD",
          title: "EUR/USD"
        },
        {
          proName: "BITSTAMP:BTCUSD",
          title: "Bitcoin"
        },
        {
          proName: "BITSTAMP:ETHUSD",
          title: "Ethereum"
        },
        {
          proName: "TVC:DXY",
          title: "DXY"
        }
      ],
      colorTheme: "dark",
      locale: "en",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      displayMode: "adaptive"
    });

    widgetContainer.appendChild(script);
    
    if (widgetRef.current) {
      widgetRef.current.appendChild(widgetContainer);
    }

    // Cleanup function
    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="bg-charcoal-gradient border-y-4 border-fluorescent-pink shadow-neon-pink py-4">
      <div className="flex items-center justify-center mb-2">
        <div className="flex items-center space-x-2 text-fluorescent-pink font-bold text-lg drop-shadow-lg">
          <TrendingUp className="w-6 h-6 animate-bounce" />
          <span>LIVE MARKET TICKER</span>
          <Zap className="w-5 h-5 animate-pulse text-electric-yellow" />
        </div>
      </div>
      
      <div 
        ref={widgetRef}
        className="w-full bg-deep-black/50 rounded-xl border-2 border-electric-purple shadow-neon-blue overflow-hidden"
        style={{
          minHeight: '62px'
        }}
      />
      
      <style jsx>{`
        .tradingview-widget-container {
          width: 100% !important;
        }
        
        .tradingview-widget-container__widget {
          width: 100% !important;
          height: 62px !important;
        }
        
        /* Override TradingView styling to match fluorescent theme */
        .tradingview-widget-container iframe {
          border-radius: 8px !important;
        }
        
        .tradingview-widget-copyright {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default TradingViewTicker;