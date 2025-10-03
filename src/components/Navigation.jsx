import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';

// Google OAuth Provider Component
const GoogleOAuthProvider = ({ children, clientId }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: window.handleGoogleCallback
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [clientId]);

  return <>{children}</>;
};

// Google Login Button Component
const GoogleLogin = ({ onSuccess, onError }) => {
  useEffect(() => {
    window.handleGoogleCallback = onSuccess;

    if (window.google) {
      setTimeout(() => {
        const buttonDiv = document.getElementById('googleSignInDiv');
        if (buttonDiv) {
          window.google.accounts.id.renderButton(
            buttonDiv,
            { 
              theme: 'outline', 
              size: 'large',
              width: 400,
              text: 'continue_with'
            }
          );
        }
      }, 100);
    }
  }, [onSuccess]);

  return <div id="googleSignInDiv" className="flex justify-center"></div>;
};

// JWT Decode function
const jwt_decode = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};

// Forbes Login Popup Component
const ForbesLogin = ({ onClose, onLoginSuccess }) => {
  const handleGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const userInfo = jwt_decode(token);
    console.log("Google User:", userInfo);

    // Send token to Django backend
    fetch("http://127.0.0.1:8000/auth/google/login/callback/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend response:", data);
        
        const userData = {
          id: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          loginTime: new Date().toISOString(),
          authToken: data.key
        };
        
        onLoginSuccess(userData);
        onClose();
      })
      .catch((err) => {
        console.error("Backend error:", err);
        alert("Login failed. Please try again.");
      });
  };

  return (
    <GoogleOAuthProvider clientId="826092748377-uic5cm4rg96qrvk8qetvkiel1ual98ni.apps.googleusercontent.com">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
          <button
            className="absolute top-4 right-4 text-gray-400 text-xl hover:text-gray-600"
            onClick={onClose}
          >
            ✕
          </button>

          <h2 className="text-2xl font-serif text-center mb-8">Sign In To Forbes</h2>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Login Failed")}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

// Navigation Component
const Navigation = ({ isMenuOpen, setIsMenuOpen, user, onSignInClick, onLogout, onNavigate, searchOpen, setSearchOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="bg-zinc-900 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left side - Menu */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-300 transition-colors p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Center - Logo */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 text-white text-2xl sm:text-3xl font-serif tracking-tight cursor-pointer hover:text-gray-300 transition-colors" 
            onClick={() => onNavigate('home')}
          >
            Forbes
          </div>

          {/* Right side - Subscribe and Sign In */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors hidden md:block">
              Subscribe: Less than $1.50/wk
            </button>
            
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <img 
                  src={user.picture} 
                  alt={user.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white"
                  title={user.name}
                />
                <button 
                  onClick={onLogout}
                  className="text-white hover:text-gray-300 text-xs sm:text-sm font-medium hidden sm:block"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={onSignInClick}
                className="text-white hover:text-gray-300 text-xs sm:text-sm font-medium transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Smooth Animation */}
      <div 
        className={`bg-zinc-900 border-t border-zinc-700 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="w-full px-4 sm:px-6 py-6">
          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-zinc-700">
            <button className="bg-white text-zinc-900 px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors">
              Newsletters
            </button>
            <button className="bg-white text-zinc-900 px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors">
              Games
            </button>
            <button className="bg-white text-zinc-900 px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors">
              Share a News Tip
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6 sm:mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Forbes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800 text-white placeholder-gray-500 px-4 py-2.5 sm:py-3 rounded border border-zinc-700 focus:outline-none focus:border-zinc-600 text-sm"
              />
              <Search className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            </div>
          </div>

          {/* Menu Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Featured */}
            <div>
              <h3 className="text-white font-serif text-lg sm:text-xl mb-3 sm:mb-4">Featured</h3>
              <div className="space-y-2 sm:space-y-3">
                <button onClick={() => onNavigate('breaking-news')} className="block text-gray-300 hover:text-white text-sm transition-colors">Breaking News</button>
                <button onClick={() => onNavigate('white-house')} className="block text-gray-300 hover:text-white text-sm transition-colors">White House Watch</button>
                <button onClick={() => onNavigate('daily-cover')} className="block text-gray-300 hover:text-white text-sm transition-colors">Daily Cover Stories</button>
                <button onClick={() => onNavigate('more-featured')} className="block text-gray-300 hover:text-white text-sm transition-colors">More...</button>
              </div>
            </div>

            {/* Billionaires */}
            <div>
              <h3 className="text-white font-serif text-lg sm:text-xl mb-3 sm:mb-4">Billionaires</h3>
              <div className="space-y-2 sm:space-y-3">
                <button onClick={() => onNavigate('worlds-billionaires')} className="block text-gray-300 hover:text-white text-sm transition-colors">World's Billionaires</button>
                <button onClick={() => onNavigate('forbes-400')} className="block text-gray-300 hover:text-white text-sm transition-colors">Forbes 400</button>
                <button onClick={() => onNavigate('richest-women')} className="block text-gray-300 hover:text-white text-sm transition-colors">America's Richest Self-Made Women</button>
                <button onClick={() => onNavigate('more-billionaires')} className="block text-gray-300 hover:text-white text-sm transition-colors">More...</button>
              </div>
            </div>

            {/* Innovation */}
            <div>
              <h3 className="text-white font-serif text-lg sm:text-xl mb-3 sm:mb-4">Innovation</h3>
              <div className="space-y-2 sm:space-y-3">
                <button onClick={() => onNavigate('brand-growth')} className="block text-gray-300 hover:text-white text-sm transition-colors">The New Brand Growth Formula <span className="text-xs text-gray-500">| Paid Program</span></button>
                <button onClick={() => onNavigate('enterprise-ai')} className="block text-gray-300 hover:text-white text-sm transition-colors">Enterprise AI</button>
                <button onClick={() => onNavigate('ai')} className="block text-gray-300 hover:text-white text-sm transition-colors">AI</button>
                <button onClick={() => onNavigate('more-innovation')} className="block text-gray-300 hover:text-white text-sm transition-colors">More...</button>
              </div>
            </div>

            {/* Leadership */}
            <div>
              <h3 className="text-white font-serif text-lg sm:text-xl mb-3 sm:mb-4">Leadership</h3>
              <div className="space-y-2 sm:space-y-3">
                <button onClick={() => onNavigate('under-30')} className="block text-gray-300 hover:text-white text-sm transition-colors">Under 30</button>
                <button onClick={() => onNavigate('c-suite')} className="block text-gray-300 hover:text-white text-sm transition-colors">C-Suite</button>
                <button onClick={() => onNavigate('careers')} className="block text-gray-300 hover:text-white text-sm transition-colors">Careers</button>
                <button onClick={() => onNavigate('more-leadership')} className="block text-gray-300 hover:text-white text-sm transition-colors">More...</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Main App Component
export default function ForbesNavbar() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    console.log('User logged in:', userData);
  };

  const handleLogout = () => {
    setUser(null);
    console.log('User logged out');
  };

  const handleNavigate = (section) => {
    setIsMenuOpen(false);
    console.log('Navigate to:', section);
  };

  return (
    <div>
      <Navigation 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        user={user}
        onSignInClick={() => setShowLogin(true)}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />

      {/* Login Modal */}
      {showLogin && (
        <ForbesLogin 
          onClose={() => setShowLogin(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}