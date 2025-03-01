# Coding Platform

A modern, interactive coding platform built with a microservices architecture, featuring real-time code editing, execution, and collaboration capabilities.

## 📸 Screenshots

### Home Page
![Home Page](https://github.com/user-attachments/assets/7ffa24d1-7c05-40ae-9030-e5cae7305e93)

### Platform Features

| ![Code Editor](https://github.com/user-attachments/assets/c3f251e6-91d7-44d6-b2b8-10c193f601fb) | ![Terminal Integration](https://github.com/user-attachments/assets/54aa7823-4e0e-4a09-9e9b-9e41f58df2a5) | ![Collaboration](https://github.com/user-attachments/assets/e05c5525-42b9-4051-9066-ee80c3cf364f) |
| --- | --- | --- |
| ![Code Execution](https://github.com/user-attachments/assets/f6762142-4146-42f9-87ca-1fcfebea9307) | ![User Dashboard](https://github.com/user-attachments/assets/51e22832-66d0-4359-9546-166009cc0b7a) | ![Authentication](https://github.com/user-attachments/assets/e807eac9-aab5-4e09-aa2c-fbef6f199905) |


## 🏗️ System Architecture

The project consists of three main components:

1. **Frontend & Auth Service** (`coding_platform/`)
   - Next.js application handling UI and authentication
   - Real-time code editing interface
   - User authentication and session management

2. **WebSocket Backend** (`server/`)
   - Node.js server handling real-time connections
   - User collaboration features
   - Code execution coordination
   - Real-time communication between users

3. **Code Execution Service** (`server2/`)
   - Dockerized environment for secure code execution
   - Isolated containers for running user code
   - Support for multiple programming languages
   - Sandboxed execution environment

## 🚀 Features

- Real-time code editing with Monaco Editor
- Terminal integration using xterm.js
- Secure code execution in isolated containers
- User authentication with NextAuth.js
- Interactive UI with GSAP animations
- Real-time collaboration using Socket.IO
- PostgreSQL database integration
- Responsive design with Tailwind CSS

## 🛠️ Tech Stack

### Frontend (`coding_platform/`)
- Next.js 14, React 18, TypeScript
- Monaco Editor for code editing
- xterm.js for terminal emulation
- Tailwind CSS for styling
- NextAuth.js for authentication
- GSAP for animations
- Socket.IO client for real-time communication

### WebSocket Server (`server/`)
- Node.js
- Socket.IO server
- Express.js
- PostgreSQL integration

### Code Execution Service (`server2/`)
- Docker
- Container orchestration
- Language-specific runtime environments

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Docker and Docker Compose
- Git
- Google OAuth credentials
- GitHub OAuth credentials

## 🔐 Environment Setup

### Frontend Environment Variables (`coding_platform/.env`)

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth Credentials
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret
```

To set up authentication:
1. Create a Google Cloud Project and obtain OAuth credentials
2. Create a GitHub OAuth App and obtain client credentials
3. Generate a secure random string for NEXTAUTH_SECRET

<!-- ## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Setup Frontend**
   ```bash
   cd coding_platform
   npm install
   # Copy .env.example to .env and configure with your credentials
   cp .env.example .env
   npm run dev
   ```

3. **Setup WebSocket Server**
   ```bash
   cd server
   npm install
   # Configure environment variables
   npm start
   ```

4. **Setup Code Execution Service**
   ```bash
   cd server2
   docker-compose up --build
   ``` 

## 🔧 Available Scripts

### Frontend (`coding_platform/`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### WebSocket Server (`server/`)
- `npm start` - Start the WebSocket server
- `npm run dev` - Start with nodemon for development

### Code Execution Service (`server2/`)
- `docker-compose up` - Start the container service
- `docker-compose down` - Stop and remove containers -->

## 📁 Project Structure

```
project/
├── coding_platform/    # Frontend & Auth Service
│   ├── app/           # Next.js app directory
│   ├── public/        # Static files
│   └── ...config files
│
├── server/            # WebSocket Backend
│   ├── src/          # Source code
│   └── ...config files
│
└── server2/          # Code Execution Service
    ├── Dockerfile
    ├── docker-compose.yml
    └── ...service files
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
