
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme, Screen, CartItem, Business, Activity, UserData } from './types';
import { INITIAL_BUSINESSES } from './data';
import { SmartAssistant } from './components/SmartAssistant';
import { Sidebar } from './components/Navigation';
import { SplashScreen } from './components/SplashScreen'; // Import Splash
import { CONFIG } from './config';
import { supabase } from './supabaseClient';

// Screens
import { OnboardingScreen } from './screens/Onboarding';
import { DashboardScreen } from './screens/Dashboard';
import { RideScreen } from './screens/Ride';
import { MarketplaceScreen } from './screens/Marketplace';
import { EarnScreen } from './screens/Earn';
import { BusinessDetailScreen } from './screens/BusinessDetail';
import { CheckoutScreen } from './screens/Checkout';
import { ProfileScreen } from './screens/Profile';

// --- API INITIALIZATION ---
const initOneSignal = async () => {
  console.log("OneSignal Placeholder: Ready to init with App ID", CONFIG.ONESIGNAL_APP_ID);
};

export const triggerHaptic = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(10);
  }
};

export const GreenGlow = () => (
  <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#00D68F] opacity-[0.15] blur-[120px] rounded-full pointer-events-none z-0"></div>
);

const App = () => {
  const [theme, setTheme] = useState<Theme>('light');

  // App State
  const [isLoading, setIsLoading] = useState(true); // Splash Screen State
  const [screen, setScreen] = useState<Screen>('onboarding'); // Default to onboarding, updated by session check

  const [cart, setCart] = useState<CartItem[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([
    { id: 'a1', type: 'ride', title: 'Ride to Office', subtitle: 'Standard Car', price: 300, date: 'Today, 8:30 AM', status: 'completed' },
    { id: 'a2', type: 'order', title: 'Burger Joint', subtitle: '2 Items', price: 370, date: 'Yesterday', status: 'completed' }
  ]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<any>(null);
  const [showAssistant, setShowAssistant] = useState(false);

  const [history, setHistory] = useState<Screen[]>([]);

  const [user, setUser] = useState<UserData>({
    name: '',
    phone: '',
    email: '',
    location: 'Banjul, The Gambia',
    photo: null,
    rating: 4.8
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Initialize Services & Check Session on Mount
  useEffect(() => {
    initOneSignal();

    const initializeApp = async () => {
      // Minimum Splash Screen time for aesthetic purposes (1.5 seconds)
      const minSplashTime = new Promise(resolve => setTimeout(resolve, 1500));

      const checkSession = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();

          if (session && session.user) {
            console.log("Supabase Session Found:", session.user.email);

            // Fetch User Profile from Supabase
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              setUser({
                name: profile.full_name || '',
                phone: profile.phone || '',
                email: profile.email || '',
                location: profile.location || 'Banjul, The Gambia',
                photo: profile.avatar_url || null,
                rating: profile.average_rating || 5.0
              });
            }
            // If user is found, go to dashboard
            setScreen('dashboard');
          } else {
            // No user, stay on onboarding
            setScreen('onboarding');
          }
        } catch (e) {
          console.error("Session Check Error:", e);
          setScreen('onboarding');
        }
      };

      // Wait for both the timer and the session check
      await Promise.all([minSplashTime, checkSession()]);

      // Hide Splash Screen
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  const navigate = (scr: Screen, addToHistory: boolean = false) => {
    triggerHaptic();
    if (addToHistory) {
      setHistory(prev => [...prev, screen]);
    } else {
      if (['dashboard', 'marketplace', 'earn', 'profile', 'ride'].includes(scr)) {
        setHistory([]);
      }
    }
    setScreen(scr);
  };

  const goBack = () => {
    triggerHaptic();
    if (history.length > 0) {
      const newHistory = [...history];
      const prevScreen = newHistory.pop();
      setHistory(newHistory);
      if (prevScreen) setScreen(prevScreen);
    } else {
      setScreen('dashboard');
    }
  };

  const toggleTheme = () => {
    triggerHaptic();
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    triggerHaptic();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolling(true);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  };

  // Screen Rendering Logic
  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <OnboardingScreen theme={theme} navigate={navigate} setUser={setUser} />;
      case 'dashboard':
        return <DashboardScreen user={user} theme={theme} navigate={navigate} toggleTheme={toggleTheme} setShowAssistant={setShowAssistant} favorites={favorites} businesses={businesses} recentActivity={recentActivity} setRecentActivity={setRecentActivity} setSelectedBusiness={setSelectedBusiness} isScrolling={isScrolling} handleScroll={handleScroll} />;
      case 'ride':
        return <RideScreen theme={theme} navigate={navigate} goBack={goBack} setRecentActivity={setRecentActivity} />;
      case 'marketplace':
        return <MarketplaceScreen theme={theme} navigate={navigate} businesses={businesses} setSelectedBusiness={setSelectedBusiness} isScrolling={isScrolling} handleScroll={handleScroll} toggleFavorite={toggleFavorite} favorites={favorites} />;
      case 'earn':
        return <EarnScreen theme={theme} navigate={navigate} isScrolling={isScrolling} />;
      case 'business-detail':
        return <BusinessDetailScreen theme={theme} navigate={navigate} goBack={goBack} selectedBusiness={selectedBusiness} cart={cart} setCart={setCart} />;
      case 'checkout':
        return <CheckoutScreen theme={theme} navigate={navigate} goBack={goBack} cart={cart} setCart={setCart} user={user} />;
      case 'profile':
        return <ProfileScreen
          theme={theme}
          navigate={navigate}
          setScreen={setScreen}
          user={user}
          setUser={setUser}
          recentActivity={recentActivity}
          favorites={favorites}
          businesses={businesses}
          isScrolling={isScrolling}
          handleScroll={handleScroll}
        />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex h-screen w-full ${theme === 'light' ? 'bg-[#F2F2F7]' : 'bg-black'} transition-colors overflow-hidden`}>
      {/* Splash Screen Overlay */}
      {isLoading && <SplashScreen theme={theme} />}

      {/* Desktop Sidebar */}
      {!isLoading && screen !== 'onboarding' && <Sidebar active={screen} navigate={navigate} theme={theme} />}

      {/* Main Content Area */}
      <div className={`flex-1 relative flex justify-center bg-gray-100 dark:bg-black/50 overflow-hidden ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        {/* Mobile Simulator Container for Web View */}
        <div className="w-full h-full md:max-w-[480px] md:shadow-2xl md:border-x md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-black relative overflow-hidden">
          {renderScreen()}
        </div>
      </div>

      {showAssistant && <SmartAssistant onClose={() => setShowAssistant(false)} theme={theme} />}
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
