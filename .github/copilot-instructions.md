# AI Quantum Charts - Copilot Instructions

## Project Overview
This is a **multi-platform trading software suite** designed as a "TradingView killer" - a 100% independent trading platform that cannot be shut down by external services. The project consists of 4 separate React-based platforms in a monorepo structure:

1. **Main Trading Platform** (root) - Core charts and trading features
2. **Crypto Mining Hub** (`crypto-mining-hub/`) - Cryptocurrency mining dashboard  
3. **Gaming Builds** (`gaming_builds/`) - PC gaming build configurator
4. **Gaming Portal** (`gaming-portal/`) - Gaming community portal

## Architecture Patterns

### Service-Based Frontend Architecture
The main platform uses a service-oriented frontend with these core services in `src/services/`:
- `marketData.ts` - Triple API integration (Alpha Vantage, Yahoo Finance, IEX Cloud)
- `technicalIndicators.ts` - 10+ indicators (RSI, MACD, Bollinger Bands, etc.)
- `drawingTools.ts` - Professional chart drawing tools
- `alertEngine.ts` - Smart alert system with multi-channel notifications
- `scriptingEngine.ts` - Custom Pine Script alternative called "Qubit"

### Canvas-First Rendering
Charts use HTML5 Canvas (`EnhancedChart.tsx`) rather than SVG libraries. Drawing tools integrate directly with canvas for performance. The `IndependentChart.css` contains canvas-specific styles.

### Component Structure Pattern
Components follow this naming convention:
- UI containers: `*UI.tsx` (e.g., `AITradingUI.tsx`, `DrawingToolsUI.tsx`)
- Core features: descriptive names (`EnhancedChart.tsx`, `GridDashboard.tsx`)
- Business logic: service classes in `src/services/`

## Key Development Workflows

### Running the Platform
```bash
# Main trading platform
npm run dev              # Frontend only
npm run dev:full         # Frontend + backend server
npm run server:dev       # Backend only

# Individual platforms
cd crypto-mining-hub && npm run dev
cd gaming_builds && npm run dev  
cd gaming-portal && npm run dev
```

### Multi-Project Dependencies
Each sub-platform has its own `package.json`. The root project includes both frontend and backend dependencies. Use `concurrently` for running multiple services.

### Testing Strategy
- Jest configuration in `jest.config.js`
- Tests should be in `**/__tests__/**` or `**/*.{spec,test}.{ts,tsx}`
- Run with `npm test`

## Critical Integration Points

### Market Data Pipeline
The `marketDataManager` in `marketData.ts` implements a fallback strategy across 3 APIs:
```typescript
// Pattern: Always implement fallback for market data
const data = await marketDataManager.getHistoricalData(symbol, interval, days);
```

### Canvas + React State Sync
Charts maintain separate canvas state and React state. Use refs for canvas access:
```typescript
const canvasRef = useRef<HTMLCanvasElement>(null);
// Initialize managers when canvas is ready
useEffect(() => {
  if (canvasRef.current && !drawingManager) {
    const manager = new DrawingToolsManager(canvasRef.current);
    setDrawingManager(manager);
  }
}, [drawingManager]);
```

### Indicator Calculation Pattern
Technical indicators are stateless functions that take candlestick data:
```typescript
const results = activeIndicators.map(name => 
  indicatorManager.calculateIndicator(name.toLowerCase(), candles)
);
```

## Project-Specific Conventions

### File Organization
- Services are classes (not hooks) in `src/services/`
- Components use TypeScript interfaces for props
- Database models in `src/database/models.ts`
- Server routes follow RESTful pattern in `src/server/routes/`

### Environment Configuration
- Backend server runs on port 3001 (configurable via `PORT`)
- Frontend dev server on port 5173 (Vite default)
- Use `dotenv` for environment variables
- CORS configured for localhost development

### State Management
No Redux - uses React hooks and service classes. Services maintain their own state and expose methods to components.

### Security Patterns
- Express server includes Helmet, CORS, rate limiting
- Rate limiting: 100 requests/15min (production), 1000 (development)
- Auth endpoints: 5 attempts/15min
- Input validation with `express-validator`

## Qubit Scripting System
Custom Pine Script alternative with lexer/parser in `src/qubit/`. Scripts are stored as objects with `code`, `type` (indicator/strategy), and `parameters`. The scripting engine compiles to JavaScript for execution.

## Multi-App Portal System
Entry point is `portal-selector.html` which routes to different platforms. Each platform is independently deployable but shares some common styling patterns (Tailwind CSS in all projects).

## Performance Considerations
- Canvas rendering for charts (not DOM/SVG)
- Service workers for offline capability (check implementation)
- Compression middleware on Express server
- 5-second market data refresh intervals (configurable)
- Alert engine runs background monitoring with debouncing

When working with this codebase, always consider the multi-platform architecture and the independence principle - features should work without external service dependencies where possible.