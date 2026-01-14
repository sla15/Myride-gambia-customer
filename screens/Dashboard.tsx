
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Search, Car, MapPin, ShoppingBag, Star, Trash2 } from 'lucide-react';
import { Theme, Screen, UserData, Activity, Business } from '../types';
import { triggerHaptic, GreenGlow } from '../index';
import { BottomNav } from '../components/Navigation';

interface Props {
  user: UserData;
  theme: Theme;
  navigate: (scr: Screen, addToHistory?: boolean) => void;
  toggleTheme: () => void;
  setShowAssistant: (s: boolean) => void;
  favorites: string[];
  businesses: Business[];
  recentActivity: Activity[];
  setRecentActivity: React.Dispatch<React.SetStateAction<Activity[]>>;
  setSelectedBusiness: (b: Business | null) => void;
  isScrolling: boolean;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

export const DashboardScreen = ({ user, theme, navigate, toggleTheme, setShowAssistant, favorites, businesses, recentActivity, setRecentActivity, setSelectedBusiness, isScrolling, handleScroll }: Props) => {
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);
  const [placeholderText, setPlaceholderText] = useState("Where to?");

  useEffect(() => {
    const texts = ["Where to?", "What to Order?"];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setPlaceholderText(texts[index]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const bgMain = theme === 'light' ? 'bg-[#F2F2F7]' : 'bg-[#000000]';
  const bgCard = theme === 'light' ? 'bg-[#FFFFFF]' : 'bg-[#1C1C1E]';
  const textMain = theme === 'light' ? 'text-[#000000]' : 'text-[#FFFFFF]';
  const textSec = theme === 'light' ? 'text-[#8E8E93]' : 'text-[#98989D]';

  return (
    <div className={`h-full flex flex-col ${bgMain} ${textMain} relative overflow-hidden animate-scale-in`}>
      <GreenGlow />
      <div className={`pt-safe px-6 pb-6 z-10 flex flex-col gap-6 ${theme === 'light' ? 'bg-white/80' : 'bg-black/80'} backdrop-blur-md transition-all`}>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-12 h-12 rounded-full bg-gray-300 bg-cover border-2 border-white dark:border-[#1C1C1E] bg-center"
                style={{ backgroundImage: `url(${user.photo || 'https://i.pravatar.cc/150?img=68'})` }}
              ></div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00D68F] rounded-full border-2 border-white dark:border-black animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xs ${textSec} font-medium`}>Good morning,</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{user.name || 'Alex'}</span>
                <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-lg ${user.rating >= 4.5 ? 'bg-[#00D68F]/10 text-[#00D68F]' :
                  user.rating >= 3.0 ? 'bg-orange-500/10 text-orange-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                  <Star size={10} fill="currentColor" />
                  <span className="text-[10px] font-black">{user.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
          <button onClick={toggleTheme} className={`w-10 h-10 rounded-full ${theme === 'light' ? 'bg-gray-100' : 'bg-[#1C1C1E]'} flex items-center justify-center transition-colors`}>
            {theme === 'light' ? <Sun size={20} className="text-orange-500" /> : <Moon size={20} className="text-[#00D68F]" />}
          </button>
        </div>
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${textSec}`} size={20} />
          <input
            onClick={() => setShowAssistant(true)}
            readOnly
            placeholder={placeholderText}
            className={`w-full h-14 pl-12 pr-4 rounded-[20px] ${theme === 'light' ? 'bg-[#F2F2F7]' : 'bg-[#1C1C1E]'} font-medium outline-none text-base placeholder:opacity-50 focus:ring-2 focus:ring-[#00D68F] transition-all cursor-pointer`}
          />
        </div>
      </div>

      <div className="flex-1 px-5 pt-2 flex flex-col gap-4 overflow-y-auto min-h-0 pb-40" onScroll={handleScroll}>
        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => navigate('ride')} className={`col-span-1 h-56 ${bgCard} rounded-[24px] relative overflow-hidden group active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer`}>
            <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover" alt="Car" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 right-4 text-right z-10">
              <div className="flex justify-end mb-1"><div className="w-8 h-8 rounded-full bg-[#00D68F] flex items-center justify-center text-white"><Car size={16} /></div></div>
              <h2 className="text-xl font-bold text-white tracking-tight">Ride</h2>
              <p className="text-xs text-white/80 flex items-center justify-end gap-1"><MapPin size={10} /> {user.location || 'Locating...'}</p>
            </div>
          </div>

          <div onClick={() => navigate('marketplace')} className={`col-span-1 h-56 ${bgCard} rounded-[24px] relative overflow-hidden group active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer`}>
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80" className="absolute inset-0 w-full h-full object-cover" alt="Market" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 right-4 text-right z-10">
              <div className="flex justify-end mb-1"><div className="w-8 h-8 rounded-full bg-[#FF9500] flex items-center justify-center text-white"><ShoppingBag size={16} /></div></div>
              <h2 className="text-xl font-bold text-white tracking-tight">Market</h2>
              <p className="text-xs text-white/80">Shops</p>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="mt-2">
            <h3 className={`text-lg font-bold mb-3 ${textMain}`}>Favorites</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {businesses.filter(b => favorites.includes(b.id)).map(b => (
                <div key={b.id} onClick={() => { setSelectedBusiness(b); navigate('business-detail', true); }} className={`min-w-[140px] p-3 rounded-[20px] ${bgCard} shadow-sm cursor-pointer`}>
                  <img src={b.image} className="w-full h-24 rounded-xl object-cover mb-2" />
                  <div className="font-bold text-sm truncate">{b.name}</div>
                  <div className={`text-xs ${textSec}`}>{b.category}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-2">
          <h3 className={`text-lg font-bold mb-3 ${textMain}`}>Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map(item => (
              <div key={item.id} className="relative transition-all duration-300">
                <div
                  onClick={() => { triggerHaptic(); setExpandedActivity(expandedActivity === item.id ? null : item.id); }}
                  className={`${bgCard} p-4 rounded-[20px] flex items-center gap-4 shadow-sm z-10 relative cursor-pointer`}
                >
                  <div className={`w-10 h-10 rounded-full ${item.type === 'ride' ? 'bg-blue-100 text-[#00D68F]' : 'bg-orange-100 text-orange-600'} flex items-center justify-center`}>
                    {item.type === 'ride' ? <Car size={20} /> : <ShoppingBag size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm">{item.title}</h4>
                      {item.rating && (
                        <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${item.rating >= 4.5 ? 'bg-[#00D68F]/10 text-[#00D68F]' :
                            item.rating >= 3.0 ? 'bg-orange-500/10 text-orange-500' :
                              'bg-red-500/10 text-red-500'
                          }`}>
                          <Star size={8} fill="currentColor" /> {item.rating}.0
                        </div>
                      )}
                    </div>
                    <p className={`text-xs ${textSec}`}>{item.date}</p>
                  </div>
                  <span className="font-semibold text-sm">D{item.price.toFixed(2)}</span>
                </div>

                {/* Expanded Actions */}
                {expandedActivity === item.id && (
                  <div className={`mt-2 flex gap-2 animate-scale-in`}>
                    <button onClick={(e) => { e.stopPropagation(); alert(`Re-${item.type === 'ride' ? 'booking' : 'ordering'}`); }} className="flex-1 bg-white text-black py-3 rounded-xl font-bold text-sm shadow-sm border border-gray-100 dark:border-gray-800">
                      Re-{item.type === 'ride' ? 'Book' : 'Order'}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setRecentActivity(prev => prev.filter(p => p.id !== item.id)); }} className="w-16 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-sm">
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav active="dashboard" navigate={navigate} theme={theme} isScrolling={isScrolling} />
    </div>
  );
};
