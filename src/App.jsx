import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Tasks from './pages/Tasks/Tasks';
import Profile from './pages/Profile/Profile';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    const disableZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    window.addEventListener('touchmove', preventDefault, { passive: false });
    window.addEventListener('gesturestart', preventDefault);
    window.addEventListener('gesturechange', preventDefault);
    window.addEventListener('touchstart', disableZoom, { passive: false });

    document.addEventListener('copy', preventDefault);
    document.addEventListener('cut', preventDefault);
    document.addEventListener('paste', preventDefault);

    // Disable vertical swipes
    if (window.Telegram?.WebApp?.disableVerticalSwipes) {
      window.Telegram.WebApp.disableVerticalSwipes();
    }

    return () => {
      window.removeEventListener('touchmove', preventDefault);
      window.removeEventListener('gesturestart', preventDefault);
      window.removeEventListener('gesturechange', preventDefault);
      window.removeEventListener('touchstart', disableZoom);

      document.removeEventListener('copy', preventDefault);
      document.removeEventListener('cut', preventDefault);
      document.removeEventListener('paste', preventDefault);

      // Re-enable vertical swipes
      if (window.Telegram?.WebApp?.enableVerticalSwipes) {
        window.Telegram.WebApp.enableVerticalSwipes();
      }
    };
  }, []);

  return (
    <div className="App">
      <div className="anim_bg"></div>
      <Router>
        <div className="app_content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Navigation />
      </Router>
    </div>
  );
}

export default App;
