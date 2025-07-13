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
- **Digital Fortress Breach**: Navigate through security systems
- **Encryption Decoder**: Crack codes and solve puzzles
- **Terminal Hacking**: Command-line style challenges
- **Cybersecurity Missions**: Learn security concepts through gameplay

#### 👶 Educational Games for Kids
- **Code Breaker Junior**: Age-appropriate coding challenges
- **Cyber Safety Adventures**: Learn online safety through fun activities
- **Digital Citizenship Quest**: Understanding responsible technology use
- **Logic Puzzle Games**: Develop problem-solving skills

#### 🚀 Featured Mission: Spaceship Battle
- **CyberHeist Battleship Strike**: Tactical warfare simulation
- Command your fleet and strategically position vessels
- Sink enemy ships in this classic battle combat simulation
- Modern graphics with retro gameplay mechanics

### 💬 Real-Time Communication
- **Secure Chat System**: Currently basic chat functionality
- **Future Enhancement**: Socket.io integration for real-time messaging
- **Encrypted Communications**: Themed around secure hacker communications

### 🔐 Authentication & Security
- **Google Sign-In**: Seamless authentication experience
- **Supabase Integration**: Secure user management and data storage
- **Session Management**: Secure user sessions and data persistence

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern component-based architecture
- **CSS3**: Custom styling with cyberpunk themes
- **JavaScript ES6+**: Modern JavaScript features
- **Responsive Design**: Mobile-first approach

### Backend & Database
- **Supabase**: 
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication management
  - Row Level Security (RLS)

### Authentication
- **Google OAuth**: Secure third-party authentication
- **Supabase Auth**: User management and session handling

### Future Integrations
- **Socket.io**: Real-time chat functionality
- **WebRTC**: Voice/video communication features

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Google OAuth credentials

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
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Database Setup**
   - Create a new Supabase project
   - Run the provided SQL migrations in `/database/migrations`
   - Configure authentication providers

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

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
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── games/
│   │   ├── chat/
│   │   └── auth/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   └── styles/
├── database/
│   └── migrations/
└── docs/
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

- **Lead Developer**: [Your Name]
- **UI/UX Designer**: [Designer Name]
- **Game Developer**: [Game Dev Name]

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

- **Email**: support@cyberheist.com
- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/cyberheist/issues)
- **Discord**: Join our community server
- **Twitter**: [@CyberHeistGame](https://twitter.com/cyberheistgame)

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