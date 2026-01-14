
import React, { useState, useRef } from 'react';
import { ArrowLeft, User, Camera, Briefcase, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Theme, Screen, UserData } from '../types';
import { triggerHaptic } from '../index';
import { CONFIG } from '../config';
import { supabase } from '../supabaseClient';

interface Props {
  theme: Theme;
  navigate: (scr: Screen) => void;
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
}

export const OnboardingScreen = ({ theme, navigate, setUser }: Props) => {
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState<string | null>(null);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const bgMain = theme === 'light' ? 'bg-[#F2F2F7]' : 'bg-[#000000]';
    const textMain = theme === 'light' ? 'text-[#000000]' : 'text-[#FFFFFF]';
    const textSec = theme === 'light' ? 'text-[#8E8E93]' : 'text-[#98989D]';
    const inputBg = theme === 'light' ? 'bg-[#E5E5EA]' : 'bg-[#2C2C2E]';

    const ProgressBar = ({ currentStep }: { currentStep: number }) => {
        const activeIndex = currentStep - 2; 
        return (
            <div className="flex gap-2 mb-8 mt-2">
               {[0, 1, 2, 3].map((i) => (
                   <div 
                    key={i} 
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= activeIndex ? 'bg-[#00D68F]' : 'bg-gray-200 dark:bg-gray-800'}`}
                   ></div>
               ))}
            </div>
        );
    };
    
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const sendOTP = async () => {
        triggerHaptic();
        setLoading(true);
        console.log("Sending OTP to:", phone);

        // --- SUPABASE MOCK ---
        // Real implementation requires Phone Auth to be enabled in Supabase Dashboard
        // await supabase.auth.signInWithOtp({ phone: `+220${phone}` });
        
        setTimeout(() => { 
            setLoading(false); 
            setStep(3); 
        }, 1000);
    };

    const verifyOTP = async () => {
        setLoading(true);
        triggerHaptic();

        // --- SUPABASE MOCK ---
        // await supabase.auth.verifyOtp({ phone: `+220${phone}`, token: otp, type: 'sms' });
        
        setTimeout(() => { 
            setLoading(false); 
            setStep(4); 
        }, 800);
    };

    const handleCompleteProfile = async () => {
        triggerHaptic();
        if(!name) { alert("Please enter your name"); return; }
        
        setLoading(true);
        
        // 1. Update Local State
        setUser(prev => ({ ...prev, name, phone, email, photo })); 
        
        // 2. Insert into Supabase 'profiles' table
        try {
            // Check if user is logged in (mocking this for now as if we had a user ID)
            const { data: { session } } = await supabase.auth.getSession();
            let userId = session?.user?.id;
            
            // If no auth session (because we skipped real OTP for demo), we can't insert into protected table
            // However, if you enable Anonymous Auth in Supabase, you could do this.
            // For this demo, we will log the attempt.
            
            console.log("Attempting to save profile to Supabase...");
            
            if (userId) {
                const { error } = await supabase.from('profiles').upsert({
                    id: userId,
                    full_name: name,
                    phone: phone,
                    email: email,
                    avatar_url: photo, // In production, upload image to Storage and use URL
                    updated_at: new Date()
                });
                
                if (error) console.error("Supabase Profile Error:", error);
                else console.log("Profile saved to Supabase!");
            } else {
                console.log("No active Supabase session. Skipping DB insert (Demo Mode).");
            }
        } catch (e) {
            console.error(e);
        }

        setLoading(false);
        navigate('dashboard');
    };

    if (step === 1) {
      return (
        <div className={`h-full w-full flex flex-col justify-between ${bgMain} ${textMain} p-6 pb-safe animate-scale-in overflow-hidden relative`}>
           
           {/* Animated Background Elements */}
           <div className="absolute top-[-10%] right-[-30%] w-[500px] h-[500px] bg-[#00D68F]/10 rounded-full blur-[80px] animate-[pulse_4s_ease-in-out_infinite]"></div>
           <div className="absolute bottom-[-10%] left-[-20%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] animate-[pulse_5s_ease-in-out_infinite_1s]"></div>

           <div className="flex-1 flex flex-col justify-end pb-10 z-10">
              <div className="mb-10 relative">
                 {/* Animated Logo */}
                 <div className="w-24 h-24 bg-black dark:bg-white rounded-[2rem] mb-8 flex items-center justify-center shadow-2xl animate-[bounce_3s_infinite]">
                    <div className="w-12 h-12 bg-[#00D68F] rounded-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-6 h-6 bg-white/30 rounded-bl-full"></div>
                    </div>
                 </div>
                 
                 <h1 className="text-6xl font-black tracking-tighter mb-6 leading-[0.95]">
                    Move<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-blue-500">Freely.</span>
                 </h1>
                 <p className={`text-lg ${textSec} leading-relaxed max-w-[280px] font-medium`}>
                    The professional way to ride, shop, and manage your business.
                 </p>
              </div>

              <div className="space-y-6">
                <button 
                    onClick={() => { triggerHaptic(); setStep(2); }} 
                    className={`w-full bg-[#00D68F] text-black py-4 rounded-full font-bold text-lg active:scale-[0.98] transition-all shadow-xl hover:shadow-[#00D68F]/30 hover:scale-[1.02]`}
                >
                    Get Started
                </button>

                <p className={`text-xs ${textSec} text-center leading-relaxed px-2`}>
                    By continuing, you have agreed to our{' '}
                    <span 
                        onClick={() => window.open('https://example.com/terms', '_blank')}
                        className="text-[#00D68F] font-bold cursor-pointer hover:underline"
                    >
                        Terms of Services
                    </span>
                    {' '}and{' '}
                    <span 
                        onClick={() => window.open('https://example.com/policy', '_blank')}
                        className="text-[#00D68F] font-bold cursor-pointer hover:underline"
                    >
                        Policy
                    </span>.
                </p>
              </div>
           </div>
        </div>
      );
    }
    
     if (step === 2) {
      return (
        <div className={`h-full w-full flex flex-col ${bgMain} ${textMain} p-6 pt-safe animate-slide-in`}>
           <ArrowLeft onClick={() => setStep(1)} className="mb-4 cursor-pointer opacity-70" />
           <ProgressBar currentStep={2} />
           
           <h2 className="text-3xl font-bold tracking-tight mb-8">Enter your number</h2>
           <div className={`flex gap-3 pb-2 border-b-2 ${theme === 'light' ? 'border-black' : 'border-white'} mb-4`}>
              <div className="font-semibold text-2xl flex items-center gap-2"><span>🇬🇲</span> +220</div>
              <input 
                type="tel" autoFocus placeholder="770 1234" value={phone} onChange={(e) => setPhone(e.target.value)}
                className={`flex-1 bg-transparent text-2xl font-semibold outline-none placeholder:text-gray-300 dark:placeholder:text-gray-700`}
              />
           </div>
           <p className={`text-sm ${textSec}`}>We'll text you a verification code.</p>
           <div className="mt-auto pb-safe">
             <button 
               onClick={sendOTP} 
               disabled={phone.length < 3 || loading}
               className={`w-full bg-white text-black py-4 rounded-full font-semibold text-lg disabled:opacity-30 shadow-lg flex items-center justify-center`}
             >
               {loading ? <Loader2 className="animate-spin" /> : 'Continue'}
             </button>
           </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className={`h-full w-full flex flex-col ${bgMain} ${textMain} p-6 pt-safe animate-slide-in`}>
           <ArrowLeft onClick={() => setStep(2)} className="mb-4 cursor-pointer opacity-70" />
           <ProgressBar currentStep={3} />

           <h2 className="text-3xl font-bold tracking-tight mb-2">Enter code</h2>
           <p className={`${textSec} mb-8`}>Sent to +220 {phone}</p>
           <div className="flex justify-between max-w-xs mx-auto mb-8">
              {[0,1,2,3].map((_, i) => (
                <div key={i} className={`w-14 h-16 rounded-xl ${theme === 'light' ? 'bg-white' : 'bg-[#2C2C2E]'} shadow-sm flex items-center justify-center text-3xl font-semibold`}>
                   {otp[i] || ''}
                </div>
              ))}
           </div>
           <input 
             className="opacity-0 absolute inset-0 z-10" type="number" value={otp} 
             onChange={(e) => {
               if (e.target.value.length <= 4) setOtp(e.target.value);
               if (e.target.value.length === 4) {
                 verifyOTP();
               }
             }}
             autoFocus
           />
           {loading && <div className="flex justify-center mb-4"><Loader2 className="animate-spin text-[#00D68F]" /></div>}
           <button className="text-[#00D68F] font-medium text-sm text-center">Resend Code</button>
        </div>
      );
    }

    if (step === 4) {
      return (
        <div className={`h-full w-full flex flex-col ${bgMain} ${textMain} p-6 pt-safe animate-slide-in`}>
           <div className="flex items-center justify-between mb-4">
              <button onClick={() => setStep(3)}><ArrowLeft className={textMain} /></button>
              <button onClick={() => navigate('dashboard')} className="text-[#00D68F] font-bold">Skip</button>
           </div>
           
           <ProgressBar currentStep={4} />

           <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3">Let's get to know you</h1>
              <p className={`${textSec} text-sm px-4`}>Add your details so drivers and sellers can identify you.</p>
           </div>

           <div className="flex justify-center mb-10">
              <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={handleImageUpload} 
                 className="hidden" 
                 accept="image/*" 
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-28 h-28 rounded-full ${inputBg} flex items-center justify-center relative cursor-pointer overflow-hidden bg-cover bg-center`}
                style={photo ? { backgroundImage: `url(${photo})` } : {}}
              >
                 {!photo && <User size={48} className={`opacity-20 ${textMain}`} />}
                 <div className="absolute bottom-0 right-0 bg-[#00D68F] w-9 h-9 rounded-full flex items-center justify-center border-4 border-[#F2F2F7] dark:border-black shadow-sm z-10">
                    <Camera size={14} className="text-black" />
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <div>
                 <div className="flex items-center gap-1 mb-2">
                    <label className={`text-sm font-bold ${textSec}`}>Full Name</label>
                    <span className="text-[#00D68F]">*</span>
                 </div>
                 <div className={`flex items-center gap-3 p-4 rounded-xl ${inputBg}`}>
                    <Briefcase size={20} className={textSec} />
                    <input 
                      placeholder="e.g. Alex Morgan" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="flex-1 bg-transparent outline-none font-medium" 
                    />
                 </div>
              </div>

              <div>
                 <div className="flex items-center justify-between mb-2">
                    <label className={`text-sm font-bold ${textSec}`}>Email Address</label>
                    <span className={`text-[10px] ${inputBg} px-2 py-0.5 rounded text-gray-500`}>Optional</span>
                 </div>
                 <div className={`flex items-center gap-3 p-4 rounded-xl ${inputBg}`}>
                    <Mail size={20} className={textSec} />
                    <input 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                      className="flex-1 bg-transparent outline-none font-medium" 
                    />
                 </div>
              </div>
           </div>

           <div className="mt-auto pb-safe pt-6">
             <button 
               onClick={handleCompleteProfile} 
               disabled={loading}
               className={`w-full bg-[#00D68F] text-black py-4 rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-2`}
             >
               {loading ? <Loader2 className="animate-spin" /> : <>Next <ArrowRight size={20} /></>}
             </button>
           </div>
        </div>
      );
    }
    return null;
  };
