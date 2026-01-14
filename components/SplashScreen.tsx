
import React from 'react';
import { Theme } from '../types';

export const SplashScreen = ({ theme }: { theme: Theme }) => {
  const bg = theme === 'light' ? 'bg-[#F2F2F7]' : 'bg-black';
  const text = theme === 'light' ? 'text-black' : 'text-white';

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${bg} transition-colors duration-500`}>
      <div className="relative flex flex-col items-center animate-scale-in">
        
        {/* Apple-style App Icon Container */}
        <div className={`w-32 h-32 rounded-[2.5rem] ${theme === 'light' ? 'bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)]' : 'bg-[#1C1C1E] shadow-[0_20px_40px_rgba(0,0,0,0.4)]'} flex items-center justify-center mb-8 relative overflow-hidden`}>
            
            {/* Subtle Gradient Glow behind logo */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D68F]/20 to-transparent opacity-50"></div>
            
            {/* Logo */}
            <div className="w-16 h-16 bg-[#00D68F] rounded-full relative overflow-hidden shadow-lg animate-[pulse_3s_ease-in-out_infinite]">
                <div className="absolute top-0 right-0 w-8 h-8 bg-white/30 rounded-bl-full"></div>
            </div>
        </div>
        
        {/* App Name */}
        <h1 className={`text-3xl font-bold tracking-tight ${text} mb-2 opacity-0 animate-[fadeIn_0.8s_ease-out_0.3s_forwards]`}>
          SuperApp
        </h1>
        
        {/* Loading Spinner */}
        <div className="mt-8">
            <div className="w-6 h-6 border-2 border-[#00D68F] border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <p className={`absolute bottom-12 text-xs font-semibold uppercase tracking-widest opacity-30 ${text}`}>
            Secure • Fast • Simple
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
