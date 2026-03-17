# 🎮 QuizArena - Real-Time Multiplayer Quiz Platform

<div align="center">
  <img src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1767624264/cbb48788-cc24-4164-a3e8-665b8e073001.png" alt="QuizArena Banner" width="100%">
  
  <p><strong>A real-time multiplayer quiz platform where hosts can create and run interactive quiz games with live leaderboards, AI-powered quiz generation, and seamless reconnection features.</strong></p>

  ![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=vercel)
  ![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
  ![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
  
  🔗 **Live Demo:** [https://quiz-arena-web.vercel.app/](https://quiz-arena-web.vercel.app/)
  
  🎯 **Player Join:** [https://quiz-arena-web.vercel.app/join](https://quiz-arena-web.vercel.app/join)
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

**QuizArena** is a real-time multiplayer quiz platform that brings the excitement of live trivia games to the web. Built as a monorepo using Turborepo, it features a modern React frontend, robust Express.js backend, dedicated WebSocket server for real-time communication, and PostgreSQL database.

### Key Highlights

- 🎮 **Real-Time Multiplayer** - Host and play quizzes with live synchronization
- 🤖 **AI Quiz Builder** - One-click quiz generation using AI
- 📊 **Live Leaderboards** - Real-time player rankings during games
- 🔄 **Smart Reconnection** - Automatic reconnection if players disconnect
- 🎨 **Multiple Themes** - Custom quiz themes and styles
- 📈 **Host Analytics** - Track quiz performance and player statistics
- 🚀 **High Performance** - WebSocket-powered real-time updates

---

## ✨ Features

### Host Features
- 🔐 Host authentication (login/logout)
- 📚 View all available quizzes
- 🎯 Create custom quizzes with multiple questions
- 🤖 AI-powered quiz generation with one click
- 🎮 Host live quiz sessions with real-time player management
- 📊 Host dashboard with 7-day quiz history and results
- 👥 Manage players during live sessions
- 📈 View detailed analytics and statistics
- 🎨 Apply custom themes to quizzes

### Player Features
- ⚡ Instant join with no registration required
- 🎮 Play quizzes in real-time
- 📊 View live leaderboards during gameplay
- 🔄 Automatic reconnection if disconnected
- 🎯 Track personal scores and rankings
- 🎨 Experience custom quiz themes

### Real-Time Features
- ⚡ WebSocket-based real-time communication
- 🔴 Live player count updates
- 📊 Instant leaderboard updates
- ⏱️ Synchronized quiz timers
- 🔔 Real-time notifications
- 🔄 Seamless reconnection logic
- 💬 Live host-player interaction

### Quiz Management
- ✅ Create quizzes with multiple-choice questions
- ✅ Set time limits for questions
- ✅ Configure points per question
- 🤖 Generate quizzes using AI

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Zustand](https://img.shields.io/badge/Zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

### Backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![webSocket](https://img.shields.io/badge/webSocket-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### Database & ORM
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

### DevOps & Tools
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

### AI Integration
![Google Gemini](https://img.shields.io/badge/Gemini-412991?style=for-the-badge&logo=openai&logoColor=white)

---

## 🏗️ Architecture

This project follows a **monorepo architecture** using Turborepo with a dedicated WebSocket server for real-time communication.

```
quiz-arena/
├── apps/
│   ├── httpServer/                    # Express.js REST API server
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── websocketServer/        # WebSocket server for real-time
│   │   ├── src/
│   │   │   ├── handlers/       # WebSocket event handlers
│   │   │   ├── services/       # Game logic services
│   │   │   ├── utils/          # Utility functions
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── web/                    # React frontend application
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── hooks/
│       │   ├── store/
│       │   └── App.tsx
│       └── package.json
│
└── packages/
    ├── database/               # Prisma schema and migrations
    │   ├── prisma/
    │   └── package.json
    │
    ├── eslint-config/          # Shared ESLint configuration
    │
    ├── typescript-config/      # Shared TypeScript configuration
    │
    ├── tailwind-config/        # Shared Tailwind CSS configuration
    │
    └── ui/                     # Shared React components
        ├── components/
        └── package.json
```
---

## 📸 Screenshots

### Home Page
<div align="center">
  <img src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1767624264/cbb48788-cc24-4164-a3e8-665b8e073001.png" alt="Home Page" width="800">
  <p><em>Welcome to QuizArena - Host or join quiz games</em></p>
</div>

### Features
<div align="center">
  <img src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1765246075/7241563a-9c17-466f-b984-2e15f43b18f1.png" alt="Host Dashboard" width="800">
  <p><em>Features of quizArena</em></p>
</div>

### Live Quiz Game
<div align="center">
  <img src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1765246206/7f8de7f9-f6b4-420b-8bc4-85f5ef4827bf.png" alt="Live Quiz Game" width="800">
  <p><em>Real-time multiplayer quiz gameplay</em></p>
</div>

### Real-Time Leaderboard
<div align="center">
  <img src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1766065502/leaderboard_afpo4q.jpg" alt="Leaderboard" width="800">
  <p><em>Live rankings updated in real-time</em></p>
</div>

### Custom Themes (jungle)
<div align="center">
  <img src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1765246151/a8f3d486-3f3a-4ee6-9023-a661a9ea0607.png" alt="Custom Themes" width="800">
  <p><em>Multiple themes to customize your quiz experience (Jungle Theme) </em></p>
</div>

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher) - `npm install -g pnpm`
- **Docker** (for containerization)
- **PostgreSQL** (or use Docker)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ramji023/Quiz-Arena.git
   cd Quiz-Arena
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create `.env` files in `apps/api`, `apps/websocketServer`, and `apps/web`:
   
   **apps/api/.env**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/quizarena"
   JWT_SECRET="your-secret-key"
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   OPENAI_API_KEY="your-openai-key"
   PORT=3000
   NODE_ENV=development
   WEBSOCKET_URL=http://localhost:3001
   ```
   
   **apps/websocketServer/.env**
   ```env
   PORT=3001
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   DATABASE_URL="postgresql://user:password@localhost:5432/quizarena"
   ```
   
   **apps/web/.env**
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_WEBSOCKET_URL=http://localhost:3001
   ```

4. **Set up the database**
   
   Using Docker:
   ```bash
   docker-compose up -d postgres
   ```
   
   Or manually start PostgreSQL, then run migrations:
   ```bash
   pnpm db:migrate
   ```

5. **Start the development servers**
   ```bash
   pnpm dev
   ```
   
   This will start:
   - Frontend: `http://localhost:5173`
   - REST API: `http://localhost:3000`
   - WebSocket Server: `http://localhost:3001`

---

## 📁 Project Structure

```
quiz-arena/
├── apps/
│   ├── httpServer/
│   │   ├── src/
│   │   │   ├── controllers/      # Request handlers
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── quiz.controller.ts
│   │   │   │   └── host.controller.ts
│   │   │   ├── routes/           # API routes
│   │   │   ├── middleware/       # Custom middleware
│   │   │   ├── services/         # Business logic
│   │   │   │   ├── ai.service.ts # AI quiz generation
│   │   │   │   └── quiz.service.ts
│   │   │   ├── utils/            # Utility functions
│   │   │   └── index.ts          # Entry point
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── websocketServer/
│   │   ├── src/
│   │   │   ├── handlers/         # WebSocket event handlers
│   │   │   │   ├── game.handler.ts
│   │   │   │   ├── player.handler.ts
│   │   │   │   └── leaderboard.handler.ts
│   │   │   ├── services/         # Game logic services
│   │   │   │   ├── game.service.ts
│   │   │   │   ├── reconnect.service.ts
│   │   │   │   └── scoring.service.ts
│   │   │   ├── utils/            # Utility functions
│   │   │   └── index.ts          # WebSocket server entry
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── web/
│       ├── src/
│       │   ├── components/       # React components
│       │   │   ├── host/         # Host-specific components
│       │   │   ├── player/       # Player-specific components
│       │   │   ├── quiz/         # Quiz components
│       │   │   └── leaderboard/  # Leaderboard components
│       │   ├── pages/            # Page components
│       │   │   ├── HostDashboard.tsx
│       │   │   ├── JoinQuiz.tsx
│       │   │   └── LiveQuiz.tsx
│       │   ├── hooks/            # Custom hooks
│       │   │   ├── useWebSocket.ts
│       │   │   └── useReconnect.ts
│       │   ├── store/            # Zustand stores
│       │   │   ├── gameStore.ts
│       │   │   └── playerStore.ts
│       │   ├── lib/              # Utilities
│       │   ├── styles/           # Global styles
│       │   └── App.tsx
│       ├── public/
│       └── package.json
│
├── packages/
│   ├── database/
│   │   ├── prisma/
│   │   │   ├── schema.prisma    # Database schema
│   │   │   └── migrations/      # Database migrations
│   │   └── src/
│   │       └── index.ts         # Prisma client
│   │
│   ├── ui/                      # Shared UI components
│   ├── eslint-config/           # ESLint configs
│   ├── typescript-config/       # TypeScript configs
│   └── tailwind-config/         # Tailwind configs
│
├── turbo.json                   # Turborepo configuration
├── package.json                 # Root package.json
├── pnpm-workspace.yaml          # PNPM workspace config
├── docker-compose.yml           # Docker services
└── README.md
```

---

## 🔧 Environment Variables

### REST API Server (apps/api/.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |
| `OPENAI_API_KEY` | OpenAI API key for AI quiz generation | ✅ |
| `PORT` | Server port (default: 3000) | ❌ |
| `NODE_ENV` | Environment (development/production) | ❌ |
| `WEBSOCKET_URL` | WebSocket server URL | ✅ |

### WebSocket Server (apps/websocketServer/.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | WebSocket server port (default: 3001) | ❌ |
| `NODE_ENV` | Environment (development/production) | ❌ |
| `CORS_ORIGIN` | Allowed CORS origins | ✅ |
| `DATABASE_URL` | PostgreSQL connection string | ✅ |

### Frontend (apps/web/.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend REST API URL | ✅ |
| `VITE_WEBSOCKET_URL` | WebSocket server URL | ✅ |

---

## 🐳 Docker

### Using Docker Compose

Start all services:
```bash
docker-compose up -d
```

Services included:
- PostgreSQL database
- REST API server
- WebSocket server
- Frontend application

---

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Set environment variables
2. Deploy REST API from GitHub
3. Deploy WebSocket server separately
4. Build command: `cd ./apps/httpServer && pnpm prod:build`

### WebSocket Server Deployment

1. Deploy to a service that supports WebSocket (Railway, Render, AWS)
2. Ensure persistent connections are enabled
3. Configure CORS properly
4. Set environment variables
5. Build command: `cd ./apps/webSocketServer && pnpm prod:build`

### Frontend Deployment (Vercel)

1. Connect GitHub repository
2. Set build command: `pnpm build --filter web`
3. Set output directory: `apps/web/dist`
4. Add environment variables (API and WebSocket URLs)

### Database (Railway/Supabase)

1. Create PostgreSQL instance
2. Copy connection string to `DATABASE_URL`
3. Run migrations

---

## 🎮 How to Play

### For Hosts:
1. Visit [https://quiz-arena-web.vercel.app/](https://quiz-arena-web.vercel.app/)
2. Login with your host credentials
3. Create a new quiz or select existing one
4. Click "Play" to start a live session
5. Share the join code and join url https://quiz-arena-web.vercel.app/join with players
6. Manage the game flow and view real-time results
7. Check analytics in your dashboard

### For Players:
1. Visit [https://quiz-arena-web.vercel.app/join](https://quiz-arena-web.vercel.app/join)
2. Enter the quiz code provided by the host
3. Enter your display name
4. Wait for the host to start the game
5. Answer questions in real-time
6. View your position on the live leaderboard
7. See final results at the end

---


---

## 🔮 Future Enhancements

- [ ] Team-based quiz mode
- [ ] Power-ups and bonus features
- [ ] Custom quiz templates
- [ ] Voice chat during games
- [ ] Tournament mode with brackets
- [ ] Quiz replay and review
- [ ] Advanced analytics and insights
- [ ] Mobile app (React Native)
- [ ] Quiz categories
- [ ] Badge and achievement system
- [ ] Export quiz results to PDF

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Ram Ji Mishra** - [@ramjimishra001](https://x.com/ramjimishra001) - mramji747@gmail.com

Project Link: [https://github.com/ramji023/quiz-arena](https://github.com/ramji023/quiz-arena)

Live Demo: [https://quiz-arena-web.vercel.app/](https://quiz-arena-web.vercel.app/)

---

## 🙏 Acknowledgments

- [Turborepo](https://turbo.build/) - Build system
- [Prisma](https://www.prisma.io/) - Database ORM
- [Websocket](https://www.npmjs.com/package/ws) - Real-time communication
- [React Query](https://tanstack.com/query/) - Server state management
- [Zustand](https://zustand-demo.pmnd.rs/) - Client state management
- [Google Gemini](https://aistudio.google.com) - AI quiz generation
- [Cloudinary](https://cloudinary.com/) - Image hosting
- [Vercel](https://vercel.com/) - Deployment platform

---

## ⭐ Show your support

Give a ⭐️ if you like this project!

