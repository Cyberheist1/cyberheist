import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import { QuickGame } from './pages/QuickGame';
import { ForensicsGame } from './games/ForensicsGame';
import { ReverseGame } from './games/ReverseGame';
import { MiscGame } from './games/MiscGame';
import { TypingGame } from './games/TypingGame';
import { MemoryGame } from './games/MemoryGame';
import { CipherGame } from './games/CipherGame';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Leaderboard from './pages/LeaderBoard';
import { Auth } from './pages/Auth';
import { AuthProvider } from './contexts/AuthContext';
import KidsGames from './pages/KidsGames';
import CertificatePage from './pages/CertficatePage';


function App() {
  return (
    <AuthProvider >
    <Router>
          <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<QuickGame />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/games/misc" element={<MiscGame />} />
          <Route path="/games/forensics" element={<ForensicsGame />} />
          <Route path="/games/reverse" element={<ReverseGame />} />
          <Route path="/games/typing" element={<TypingGame />} />
          <Route path="/games/memory" element={<MemoryGame />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="/games/cipher" element={<CipherGame />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/kidsgames" element={<KidsGames />} />
        </Routes>
     
    </Router>
     </AuthProvider>
  );
}

export default App;
