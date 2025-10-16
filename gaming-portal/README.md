# Complete Gaming Portal

A comprehensive gaming portal built with React, TypeScript, and Vite, featuring multi-platform integration with Xbox, Steam, Epic Games, and PlayStation.

## Features

### 🎮 Core Gaming Features
- **Multi-Platform Integration**: Connect Xbox Live, Steam, Epic Games, and PlayStation accounts
- **Game Library Management**: Track games across all platforms with detailed statistics
- **Achievement System**: View and track achievements with rarity levels and progress
- **Friends & Social**: Manage friends across platforms with real-time status
- **Controller Support**: Bluetooth controller detection and configuration

### 🔐 Authentication & Security
- **OAuth Integration**: Secure login with gaming platforms
- **JWT Token Management**: Secure session handling
- **Multi-Platform Linking**: Link multiple gaming accounts to one profile

### 📊 Analytics & Dashboard
- **Gaming Statistics**: Comprehensive analytics of gaming activity
- **Progress Tracking**: Monitor game completion and achievement progress
- **Activity Feed**: Real-time updates of friend activities and achievements
- **Leaderboards**: Compare stats with friends and global players

### 🎯 Technical Features
- **Real-time Updates**: WebSocket integration for live features
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized with Vite for fast development and builds

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Recharts** - Interactive charts and analytics

### Backend
- **Node.js & Express** - Server framework
- **PostgreSQL** - Primary database
- **Redis** - Caching and session storage
- **JWT** - Authentication tokens
- **Axios** - HTTP client for API calls

### Gaming Platform APIs
- **Xbox Live API** - Xbox games and achievements
- **Steam Web API** - Steam library and stats
- **Epic Games API** - Epic Games store integration
- **PlayStation API** - PlayStation Network integration

## Project Structure

```
gaming-portal/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ConnectController.tsx
│   ├── pages/              # Main application pages
│   │   ├── Login.tsx       # Authentication page
│   │   ├── Signup.tsx      # User registration
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── Games.tsx       # Game library
│   │   ├── Achievements.tsx # Achievement tracking
│   │   └── Friends.tsx     # Social features
│   ├── services/           # API and backend services
│   │   └── backend.ts      # Main API service
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Redis server (optional, for caching)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL=postgres://postgres:password@localhost:5432/complete_gaming_portal
   
   # API Configuration
   REACT_APP_API_URL=http://localhost:3001
   
   # OAuth Credentials (obtain from respective platforms)
   XBOX_CLIENT_ID=your_xbox_client_id
   XBOX_CLIENT_SECRET=your_xbox_client_secret
   
   STEAM_API_KEY=your_steam_api_key
   
   EPIC_CLIENT_ID=your_epic_client_id
   EPIC_CLIENT_SECRET=your_epic_client_secret
   
   # JWT Secret
   JWT_SECRET=your_jwt_secret
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Backend Setup

The backend server should be running on port 3001. Refer to the `server.ts` file for the complete backend implementation with:
- PostgreSQL database connection
- OAuth routes for all gaming platforms
- WebSocket support for real-time features
- Comprehensive API endpoints

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Gaming Platform Integration

### Xbox Live
- Authenticate with Microsoft/Xbox Live
- Fetch game library and achievements
- Real-time friend status updates
- Gamerscore tracking

### Steam
- Steam OpenID authentication
- Game library synchronization
- Achievement data retrieval
- Friend network integration

### Epic Games
- Epic Games Store integration
- Game ownership verification
- Achievement tracking
- Social features

### PlayStation Network
- PSN account linking
- Trophy synchronization
- Friend management
- Game progress tracking

## Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User profiles and authentication
- `platform_tokens` - OAuth tokens for gaming platforms
- `games` - Game library across all platforms
- `achievements` - Achievement data and progress
- `friends` - Cross-platform friend relationships
- `game_sessions` - Gaming session tracking
- `leaderboards` - Competitive rankings

## Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### VPS Deployment
1. Set up PostgreSQL and Redis
2. Configure environment variables
3. Build the application: `npm run build`
4. Serve with nginx or similar web server

### Cloud Deployment
Compatible with:
- Vercel (frontend)
- Heroku (full-stack)
- AWS/Azure/GCP (containerized)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## API Documentation

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

### OAuth Endpoints
- `GET /auth/oauth/xbox` - Xbox Live authentication
- `GET /auth/oauth/steam` - Steam authentication
- `GET /auth/oauth/epic` - Epic Games authentication
- `GET /auth/oauth/playstation` - PlayStation authentication

### Game Endpoints
- `GET /games` - Get user's game library
- `POST /games/sync` - Sync games from platforms
- `GET /games/:id` - Get game details

### Achievement Endpoints
- `GET /achievements` - Get user achievements
- `GET /achievements/stats` - Get achievement statistics
- `POST /achievements/:id/unlock` - Mark achievement as unlocked

### Friends Endpoints
- `GET /friends` - Get friend list
- `POST /friends/request` - Send friend request
- `POST /friends/accept/:id` - Accept friend request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API endpoints

---

**🎮 Happy Gaming! 🎮**