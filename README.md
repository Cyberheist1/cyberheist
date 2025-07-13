# 🎮 CyberHeist - Breach the Digital Fortress

<div align="center">
  <img src="https://img.shields.io/badge/Hackathon-Blast%20From%20The%20Past-ff6b6b?style=for-the-badge" alt="Hackathon Theme">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</div>

## 🚀 Project Overview

**CyberHeist** is a nostalgic gaming platform that brings retro arcade games into the modern era with a sleek, cyberpunk-inspired interface. Built for the "Blast from the Past" hackathon, this project combines the charm of classic games with contemporary web technologies and design principles.

Welcome to the underground network where you can infiltrate secure systems, decode encrypted messages, and complete high-stakes digital operations - all through engaging retro games with a modern twist!

## 🎯 Theme: Blast From The Past

This project perfectly embodies the hackathon theme by:
- **Retro Gaming Experience**: Classic arcade-style games that evoke nostalgia
- **Modern UI/UX**: Contemporary design with cyberpunk aesthetics
- **Hacker Terminal Theme**: Reminiscent of 80s/90s computer terminals
- **Educational Value**: Learning through play, just like the old computer labs

## ✨ Features

### 🎮 Game Categories

#### 🔴 Hacker-Themed Games
- **CipherGame**: Decode encrypted messages and crack secret codes
- **ForensicsGame**: Digital forensics challenges and evidence analysis
- **ReverseGame**: Reverse engineering puzzles and logic challenges
- **LogicalPuzzle**: Complex problem-solving with cybersecurity themes

#### 👶 Educational Games for Kids
- **MemoryGame**: Classic memory matching with cyber-themed cards
- **MemoryMath**: Mathematical challenges to boost cognitive skills
- **MathRace**: Fast-paced arithmetic competitions
- **WordScramble**: Vocabulary building with technology terms
- **SentenceGame**: Language learning through interactive sentences
- **TypingGame**: Improve typing speed with coding-themed content
- **FillBlanks**: Complete programming concepts and cyber terminology

#### 🚀 Featured Mission: Spaceship Battle
- **CyberHeist Battleship Strike**: Tactical warfare simulation
- Command your fleet and strategically position vessels
- Sink enemy ships in this classic battle combat simulation
- Modern graphics with retro gameplay mechanics

#### 🎯 Quick Games & Challenges
- **QuickGame**: Fast-paced mini-challenges for quick entertainment
- **MiscGame**: Various puzzle games and brain teasers

### 🎮 Core Features

#### 🎯 Game Management System
- **Home Page**: Central hub for all gaming activities
- **KidsGames**: Dedicated section for educational children's games
- **QuickGame**: Fast access to mini-challenges and puzzles
- **LeaderBoard**: Global rankings and achievement tracking

#### 🔐 Authentication & User Management
- **RetroAuthGate**: Cyberpunk-themed authentication interface
- **Google Sign-In**: Seamless third-party authentication
- **ProfilePage**: User profile management and statistics
- **Auth Context**: Centralized authentication state management

#### 🏆 Achievement System
- **Certificate**: Digital certificates for completed challenges
- **CertificatePage**: Showcase earned achievements and skills
- **Progress Tracking**: Monitor learning progress across all games

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern component-based architecture with TypeScript
- **TypeScript**: Type-safe development and better code quality
- **CSS3**: Custom styling with cyberpunk themes and responsive design
- **Vite**: Fast build tool and development server

### Backend & Database
- **Supabase**: 
  - PostgreSQL database with type definitions
  - Real-time subscriptions
  - Authentication management
  - Row Level Security (RLS)

### Authentication
- **Google OAuth**: Secure third-party authentication
- **Supabase Auth**: User management and session handling
- **AuthContext**: Centralized authentication state management

### Future Integrations
- **Socket.io**: Real-time chat functionality
- **WebRTC**: Voice/video communication features

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Google OAuth credentials
- TypeScript knowledge (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cyberheist.git
   cd cyberheist
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Database Setup**
   - Create a new Supabase project
   - Set up the database schema for user profiles, game scores, and achievements
   - Configure Google OAuth in Supabase authentication settings
   - Update the `supabase.ts` types file if needed

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` (Vite default port)

## 🎨 Design Philosophy

### Visual Design
- **Cyberpunk Aesthetics**: Dark themes with neon accents
- **Terminal-Inspired UI**: Green text on dark backgrounds
- **Modern Minimalism**: Clean, uncluttered interfaces
- **Responsive Layout**: Seamless experience across devices

### User Experience
- **Intuitive Navigation**: Easy-to-use interface
- **Progressive Disclosure**: Information revealed as needed
- **Accessibility First**: WCAG compliant design
- **Performance Optimized**: Fast loading and smooth interactions

## 🏗️ Project Structure

```
cyberheist/
├── node_modules/
├── src/
│   ├── components/
│   │   ├── Certificate.tsx
│   │   └── Navbar.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── games/
│   │   ├── CipherGame.tsx
│   │   ├── FillBlanks.tsx
│   │   ├── ForensicsGame.tsx
│   │   ├── LogicalPuzzle.tsx
│   │   ├── MathRace.tsx
│   │   ├── MemoryGame.tsx
│   │   ├── MemoryMath.tsx
│   │   ├── MiscGame.tsx
│   │   ├── ReverseGame.tsx
│   │   ├── SentenceGame.tsx
│   │   ├── TypingGame.tsx
│   │   └── WordScramble.tsx
│   ├── lib/
│   │   └── supabaseClient.ts
│   ├── pages/
│   │   ├── Auth.tsx
│   │   ├── CertificatePage.tsx
│   │   ├── Home.tsx
│   │   ├── KidsGames.tsx
│   │   ├── LeaderBoard.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── QuickGame.tsx
│   │   ├── RetroAuthGate.tsx
│   │   └── SignupPage.tsx
│   ├── types/
│   │   └── supabase.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
└── package.json
```

## 🎯 Future Roadmap

### Phase 1: Enhanced Gaming
- [ ] Add more retro-inspired games
- [ ] Implement scoring and leaderboards
- [ ] Achievement system
- [ ] Game statistics and analytics

### Phase 2: Social Features
- [ ] Socket.io real-time chat integration
- [ ] User profiles and customization
- [ ] Friend system and challenges
- [ ] Community features

### Phase 3: Advanced Features
- [ ] AI-powered opponents
- [ ] VR/AR game modes
- [ ] Mobile app development
- [ ] Multi-language support

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Development Guidelines
- Follow React best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under multiple open-source licenses:

### Primary License
- **MIT License** - See [LICENSE](LICENSE) file for details

### Additional FOSS Licenses
- **Apache 2.0** - For enterprise compatibility
- **GPL v3** - For copyleft compliance
- **BSD 3-Clause** - For academic use

### FOSS United Compliance
This project is fully compliant with [FOSS United](https://fossunited.org/) principles:
- ✅ Free to use, modify, and distribute
- ✅ Open source code available
- ✅ Community-driven development
- ✅ No vendor lock-in
- ✅ Transparent development process

## 👥 Team

- **Lead Developer**: Rashi Dwivedi
- **Game Developer**: Kushagra Dwivedi

## 🏆 Hackathon Submission

### Theme Alignment: Blast From The Past
This project perfectly captures the essence of retro gaming while showcasing modern web development capabilities. It brings the nostalgic experience of classic arcade games to today's web browsers with enhanced graphics, secure authentication, and real-time features.

### Innovation Points
- Unique blend of retro aesthetics with modern functionality
- Educational gaming approach
- Cybersecurity awareness through gameplay
- Real-time communication features
- Cross-platform compatibility

## 📞 Contact & Support

- **Email**: rashidwivedi1812@gmail.com
- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/cyberheist/issues)

## 🙏 Acknowledgments

- FOSS United for promoting open-source development
- Supabase for excellent backend services
- React community for amazing libraries
- All beta testers and contributors
- Hackathon organizers for this amazing opportunity

---

<div align="center">
  <p><strong>🎮 Ready to breach the digital fortress? Let's play! 🎮</strong></p>
  <p>Made with ❤️ for the Blast from the Past Hackathon</p>
</div>
