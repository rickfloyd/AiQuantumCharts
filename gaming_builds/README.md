# 🎮 Complete Gaming Portal

A comprehensive gaming platform with OAuth integration, achievement tracking, friend systems, and Bluetooth controller support. Built for VPS/cloud deployment with PostgreSQL database.

## 🚀 Tech Stack

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Material UI 5.14.8** for components
- **Tailwind CSS 3.3.3** for styling
- **React Router DOM 6.17.0** for navigation
- **Axios** for API communication
- **Web Bluetooth API** for controller pairing

### Backend
- **Node.js** + **Express.js**
- **PostgreSQL** database
- **JWT** authentication
- **CORS** enabled
- **OAuth** integration ready

## 📁 Project Structure

```
gaming_builds/
├── 📦 Frontend (React + TypeScript)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx           # User authentication
│   │   │   ├── Signup.tsx          # User registration
│   │   │   ├── Dashboard.tsx       # Main user dashboard
│   │   │   ├── Games.tsx           # Game library & tracking
│   │   │   ├── Achievements.tsx    # Achievement system
│   │   │   └── Friends.tsx         # Friends & social features
│   │   ├── api/
│   │   │   └── backend.ts          # API service layer
│   │   ├── bluetooth/
│   │   │   └── ConnectController.tsx # Bluetooth controller pairing
│   │   ├── App.tsx                 # Main app component
│   │   ├── main.tsx                # React entry point
│   │   └── styles.css              # Tailwind CSS
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.ts              # Vite configuration
│   ├── tailwind.config.js          # Tailwind configuration
│   └── index.html                  # HTML entry point
│
└── 📦 Backend (Node.js + Express)
    ├── server.js                   # Express server & API routes
    └── package.json                # Backend dependencies
```

## 🗄️ Database Configuration

**PostgreSQL Connection String:**
```
postgres://postgres:password@localhost:5432/complete_gaming_portal
```

### Required Tables
The backend automatically creates the following tables:
- `users` - User accounts and authentication
- Additional gaming tables (games, achievements, friends) can be added

## 🛠️ Installation & Setup

### 1. Frontend Setup
```bash
cd gaming_builds
npm install
npm run dev
```
Frontend runs on: **http://localhost:5173**

### 2. Backend Setup
```bash
cd gaming_builds/backend
npm install
npm run dev
```
Backend runs on: **http://localhost:3000**

### 3. PostgreSQL Setup
```bash
# Install PostgreSQL and create database
createdb complete_gaming_portal

# The backend will automatically create required tables
```

## 🎮 Features

### ✅ Core Features
- **User Authentication** (Login/Signup with JWT)
- **OAuth Integration** (Xbox, Steam, Epic Games, PlayStation)
- **Game Library** with completion tracking
- **Achievement System** with rarity levels
- **Friends System** with online status
- **Bluetooth Controller** pairing support

### 🔄 Platform Integrations
- **Xbox Live** - Game progress and achievements
- **Steam** - Library sync and playtime
- **Epic Games** - Free games and achievements
- **PlayStation** - Trophy tracking (coming soon)

### 📱 Modern UI/UX
- **Material UI** components for polished interface
- **Tailwind CSS** for responsive design
- **Dark theme** optimized for gaming
- **Mobile-friendly** responsive layout

## 🔐 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /user/data` - Get user profile (protected)

### OAuth Providers
- `GET /auth/xbox` - Xbox Live OAuth
- `GET /auth/steam` - Steam OAuth  
- `GET /auth/epic` - Epic Games OAuth
- `GET /auth/playstation` - PlayStation OAuth

## 🎯 Development Commands

### Frontend Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
```

## 🚀 Deployment

### VPS/Cloud Deployment
1. **Frontend**: Build with `npm run build` and serve with nginx/apache
2. **Backend**: Deploy Node.js server with PM2 or Docker
3. **Database**: Configure PostgreSQL with proper connection string
4. **Environment**: Set production environment variables

### Environment Variables
```bash
# Backend
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=postgres://user:password@host:port/database
PORT=3000

# Frontend
VITE_API_URL=https://your-api-domain.com
```

## 🎮 Bluetooth Controller Support

The app includes Web Bluetooth API integration for:
- **Xbox Wireless Controllers**
- **PlayStation DualSense/DualShock**
- **Nintendo Switch Pro Controllers**
- **Generic Bluetooth gamepads**

## 📊 Achievement System

### Rarity Levels
- 🏆 **Legendary** (Red) - Ultra rare achievements
- 💎 **Epic** (Purple) - Rare achievements  
- ⭐ **Rare** (Blue) - Uncommon achievements
- 🥉 **Common** (Green) - Standard achievements

## 👥 Friends & Social

- **Friend requests** and management
- **Online status** tracking
- **Currently playing** game display
- **Party/group** functionality (coming soon)

## 🔧 Troubleshooting

### Common Issues
1. **CORS errors**: Ensure backend is running on port 3000
2. **Database connection**: Verify PostgreSQL is running and accessible
3. **Bluetooth pairing**: Requires HTTPS in production
4. **OAuth redirects**: Configure proper callback URLs

### Development Tips
- Use **Chrome DevTools** for Bluetooth debugging
- Check **Network tab** for API call errors
- Verify **JWT tokens** in localStorage
- Monitor **PostgreSQL logs** for database issues

## 📈 Next Steps

### Planned Features
- **Real-time notifications** (WebSocket)
- **Voice chat integration** (WebRTC)
- **Streaming integration** (Twitch/YouTube)
- **Tournament system**
- **Clan/guild functionality**
- **Achievement sharing**
- **Cross-platform progress sync**

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🚀 Quick Start

```bash
# 1. Start PostgreSQL database
# 2. Frontend
cd gaming_builds && npm install && npm run dev

# 3. Backend (new terminal)
cd gaming_builds/backend && npm install && npm run dev

# 4. Visit http://localhost:5173
```

**Ready to game! 🎮**