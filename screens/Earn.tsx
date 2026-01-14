
import React, { useState } from 'react';
import { Gift, Copy, Share2, ChevronRight, Award } from 'lucide-react';
import { Theme, Screen } from '../types';
import { BottomNav } from '../components/Navigation';
import { triggerHaptic } from '../index';

interface Props {
  theme: Theme;
  navigate: (scr: Screen) => void;
  isScrolling: boolean;
}

export const EarnScreen = ({ theme, navigate, isScrolling }: Props) => {
    const [copied, setCopied] = useState(false);
    const referralCode = "ALEX2025";

    const bgMain = theme === 'light' ? 'bg-[#F2F2F7]' : 'bg-[#000000]';
    const bgCard = theme === 'light' ? 'bg-[#FFFFFF]' : 'bg-[#1C1C1E]';
    const textMain = theme === 'light' ? 'text-[#000000]' : 'text-[#FFFFFF]';
    const textSec = theme === 'light' ? 'text-[#8E8E93]' : 'text-[#98989D]';

    const copyCode = () => {
        triggerHaptic();
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`h-full flex flex-col ${bgMain} ${textMain} animate-slide-in`}>
            <div className="pt-safe px-6 pb-6">
                <h1 className="text-3xl font-bold">Gifts & Earn</h1>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-32">
                {/* Hero Card */}
                <div className="bg-[#00D68F] rounded-[32px] p-6 text-black shadow-lg mb-6 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mb-4">
                            <Gift size={24} className="text-black" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Invite friends,<br/>get D50.00</h2>
                        <p className="opacity-70 mb-6 text-sm font-medium">Share your code and earn rewards when your friends take their first ride or order.</p>
                        
                        <div className="flex gap-3">
                            <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between border border-black/5">
                                <span className="font-mono font-bold tracking-widest">{referralCode}</span>
                                <button onClick={copyCode} className="p-1.5 hover:bg-black/10 rounded-lg transition-colors">
                                    {copied ? <span className="text-xs font-bold">Copied!</span> : <Copy size={18} />}
                                </button>
                            </div>
                            <button className="bg-black text-white px-4 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>
                    {/* Decor */}
                    <div className="absolute -right-4 -bottom-12 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-300/30 rounded-full blur-xl"></div>
                </div>

                {/* Balance */}
                <div className={`${bgCard} rounded-[24px] p-5 mb-6 flex items-center justify-between shadow-sm`}>
                    <div>
                        <p className={`text-xs font-bold uppercase ${textSec} mb-1`}>Rewards Balance</p>
                        <h3 className="text-3xl font-bold">D150.00</h3>
                    </div>
                    <button className={`${theme === 'light' ? 'bg-gray-100' : 'bg-white/10'} px-4 py-2 rounded-full text-sm font-bold`}>
                        History
                    </button>
                </div>

                {/* Active Rewards / Offers */}
                <h3 className="font-bold text-lg mb-4">Active Rewards</h3>
                <div className="space-y-3">
                    <div className={`${bgCard} p-4 rounded-2xl flex items-center gap-4 shadow-sm`}>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Award size={24} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold">Free Delivery</h4>
                            <p className={`text-xs ${textSec}`}>Valid for your next 3 food orders</p>
                        </div>
                        <ChevronRight size={16} className={textSec} />
                    </div>
                    
                    <div className={`${bgCard} p-4 rounded-2xl flex items-center gap-4 shadow-sm opacity-50`}>
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <Gift size={24} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold">20% Off Rides</h4>
                            <p className={`text-xs ${textSec}`}>Expired yesterday</p>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNav active="earn" navigate={navigate} theme={theme} isScrolling={isScrolling} />
        </div>
    );
};
