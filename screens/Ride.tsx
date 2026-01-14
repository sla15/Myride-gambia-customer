
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MapPin as MapPinFilled, Plus, X, Car, Bike, Star, Phone, MessageSquare, Navigation, Info, Locate } from 'lucide-react';
import { Theme, Screen, RideStatus, Activity } from '../types';
import { triggerHaptic } from '../index';
import { CONFIG } from '../config';

interface Props {
    theme: Theme;
    navigate: (scr: Screen) => void;
    goBack: () => void;
    setRecentActivity: React.Dispatch<React.SetStateAction<Activity[]>>;
}

export const RideScreen = ({ theme, navigate, goBack, setRecentActivity }: Props) => {
    const [status, setStatus] = useState<RideStatus>('idle');
    const [destinations, setDestinations] = useState<string[]>(['']);
    const [selectedTier, setSelectedTier] = useState('eco');
    const [ridePayMethod, setRidePayMethod] = useState<'cash' | 'wave'>('wave');
    const [etaSeconds, setEtaSeconds] = useState(300);
    const [rating, setRating] = useState(0);
    const [mapPins, setMapPins] = useState<{ x: number, y: number, label?: string }[]>([]);

    // Animation States
    const [driverPos, setDriverPos] = useState({ x: 80, y: 10 }); // Start top-right
    const animationRef = useRef<number | null>(null);

    // Fixed User Location (Percentages)
    const USER_POS = { x: 45, y: 50 };

    // Drag Sheet State
    const [sheetOffset, setSheetOffset] = useState(0);
    const [isSheetMinimized, setIsSheetMinimized] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const sheetStartY = useRef(0);
    const sheetCurrentY = useRef(0);

    // --- GOOGLE MAPS API INTEGRATION START ---
    const [realDistanceKm, setRealDistanceKm] = useState<number>(0);

    const calculateRouteAndPrice = async () => {
        // Placeholder for Directions Service
        console.log("Using Google Maps Key for Route:", CONFIG.GOOGLE_MAPS_API_KEY);
        setRealDistanceKm(5.2 * destinations.length);
    };

    useEffect(() => {
        if (destinations[0]) {
            calculateRouteAndPrice();
        }
    }, [destinations]);
    // --- GOOGLE MAPS API INTEGRATION END ---

    const bgMain = theme === 'light' ? 'bg-[#F2F2F7]' : 'bg-[#000000]';
    const bgCard = theme === 'light' ? 'bg-[#FFFFFF]' : 'bg-[#1C1C1E]';
    const textMain = theme === 'light' ? 'text-[#000000]' : 'text-[#FFFFFF]';
    const textSec = theme === 'light' ? 'text-[#8E8E93]' : 'text-[#98989D]';
    const inputBg = theme === 'light' ? 'bg-[#E5E5EA]' : 'bg-[#2C2C2E]';

    const updateDestination = (index: number, value: string) => {
        const newDestinations = [...destinations];
        newDestinations[index] = value;
        setDestinations(newDestinations);
    };

    const addDestination = () => {
        setDestinations([...destinations, '']);
    };

    const removeDestination = (index: number) => {
        if (destinations.length > 1) {
            const newDestinations = destinations.filter((_, i) => i !== index);
            setDestinations(newDestinations);

            // Remove corresponding pin if it exists
            if (index < mapPins.length) {
                const newPins = mapPins.filter((_, i) => i !== index);
                setMapPins(newPins);
            }
        } else {
            updateDestination(0, '');
            setMapPins([]);
        }
    };

    const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (status !== 'idle') return;

        triggerHaptic();
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Simulate Reverse Geocoding
        const streets = ["Kairaba Ave", "Senegambia Strip", "Bertil Harding Hwy", "Pipeline Rd", "Banjul Market", "Brusubi Turn"];
        const randomStreet = streets[Math.floor(Math.random() * streets.length)];
        const address = `${randomStreet} ${Math.floor(Math.random() * 100) + 1}`;

        // Determine where to put the address
        let newDestIndex = -1;
        let newDestinations = [...destinations];

        if (!newDestinations[0]) {
            newDestIndex = 0;
            newDestinations[0] = address;
        } else if (newDestinations[newDestinations.length - 1]) {
            newDestIndex = newDestinations.length;
            newDestinations.push(address);
        } else {
            newDestIndex = newDestinations.length - 1;
            newDestinations[newDestIndex] = address;
        }

        setDestinations(newDestinations);
        setMapPins([...mapPins, { x, y, label: address }]);
    };

    // --- DRIVER ANIMATION LOGIC ---
    useEffect(() => {
        // Clear interval on cleanup
        return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
    }, []);

    useEffect(() => {
        if (status === 'accepted') {
            // Phase 1: Driver moving to User
            const start = { x: 80, y: 10 };
            const end = USER_POS;
            const duration = 10000; // 10 seconds for demo
            let startTime = Date.now();

            const animate = () => {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Linear Interpolation
                const currentX = start.x + (end.x - start.x) * progress;
                const currentY = start.y + (end.y - start.y) * progress;

                setDriverPos({ x: currentX, y: currentY });

                // Update ETA text simulation
                setEtaSeconds(Math.ceil((1 - progress) * 300)); // Map progress to 5 mins

                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animate);
                } else {
                    setStatus('arrived');
                }
            };
            animationRef.current = requestAnimationFrame(animate);

        } else if (status === 'in-progress') {
            // Phase 2: Driver moving to Destination (or first pin)
            if (mapPins.length === 0) return;

            const start = USER_POS;
            const end = mapPins[0]; // First destination
            const duration = 15000;
            let startTime = Date.now();

            const animate = () => {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const currentX = start.x + (end.x - start.x) * progress;
                const currentY = start.y + (end.y - start.y) * progress;

                setDriverPos({ x: currentX, y: currentY });

                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animate);
                } else {
                    // Arrived at destination
                }
            };
            animationRef.current = requestAnimationFrame(animate);
        }
    }, [status, mapPins]);

    useEffect(() => {
        if (status === 'searching') {
            setEtaSeconds(300);
            setDriverPos({ x: 80, y: 10 }); // Reset driver
        }
    }, [status]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        if (mins === 0 && secs === 0) return 'Arrived';
        if (mins === 0) return `${secs}s`;
        return `${mins} min`;
    };

    const distanceToUse = realDistanceKm || (5.2 * destinations.length);
    const baseRate = 40;
    const minFare = 300;

    const calculatePrice = (multiplier: number) => {
        const price = distanceToUse * baseRate * multiplier;
        return Math.max(minFare, Math.ceil(price));
    };

    const tiers = [
        { id: 'eco', label: 'Economy', mult: 1, time: '3 min', icon: Car, desc: '4 seats' },
        { id: 'prem', label: 'Premium', mult: 1.8, time: '5 min', icon: Car, desc: 'AC • 4 seats' },
        { id: 'moto', label: 'Moto', mult: 0.6, time: '2 min', icon: Bike, desc: 'Fast • 1 seat' }
    ];

    const confirmRide = () => {
        if (!destinations[0]) return;
        setStatus('searching');
        setTimeout(() => setStatus('accepted'), 2000);
    };

    const startTrip = () => {
        setStatus('in-progress');
    };

    const completeTrip = () => {
        setStatus('review');
    };

    const submitReview = () => {
        const newActivity: Activity = {
            id: Math.random().toString(),
            type: 'ride',
            title: destinations[0] || 'Ride',
            subtitle: 'Standard Car',
            price: calculatePrice(tiers.find(t => t.id === selectedTier)?.mult || 1),
            date: 'Just now',
            status: 'completed',
            rating: rating
        };
        setRecentActivity(prev => [newActivity, ...prev]);

        setStatus('idle');
        setDestinations(['']);
        setRating(0);
        setMapPins([]);
        navigate('dashboard');
    };

    const currentPrice = calculatePrice(tiers.find(t => t.id === selectedTier)?.mult || 1);

    // --- SHEET DRAG HANDLERS ---
    const handleSheetTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        sheetStartY.current = e.touches[0].clientY;
        sheetCurrentY.current = e.touches[0].clientY;
    };

    const handleSheetTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - sheetStartY.current;

        if (isSheetMinimized) {
            if (deltaY < 0) {
                setSheetOffset(Math.max(0, 500 + deltaY));
            }
        } else {
            if (deltaY > 0) {
                setSheetOffset(deltaY);
            }
        }
    };

    const handleSheetTouchEnd = () => {
        setIsDragging(false);
        if (isSheetMinimized) {
            if (sheetOffset < 400) {
                setIsSheetMinimized(false);
                setSheetOffset(0);
            } else {
                setSheetOffset(500);
            }
        } else {
            if (sheetOffset > 150) {
                setIsSheetMinimized(true);
                setSheetOffset(500);
            } else {
                setSheetOffset(0);
            }
        }
    };

    const sheetTransform = `translateY(${sheetOffset}px)`;

    return (
        <div className={`h-full flex flex-col ${bgMain} ${textMain} relative`}>
            {/* Interactive Map Area */}
            <div className="absolute inset-0 z-0 overflow-hidden cursor-crosshair active:cursor-grabbing" onClick={handleMapClick}>
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover opacity-80 dark:opacity-50 pointer-events-none transition-opacity" alt="Map" />

                <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none transition-all duration-300"
                    style={{ left: `${USER_POS.x}%`, top: `${USER_POS.y}%` }}
                >
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse relative">
                        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                </div>

                {(status === 'accepted' || status === 'arrived' || status === 'in-progress') && (
                    <div
                        className="absolute z-20 transition-all duration-75 ease-linear pointer-events-none"
                        style={{ left: `${driverPos.x}%`, top: `${driverPos.y}%` }}
                    >
                        <div className="relative -translate-x-1/2 -translate-y-1/2">
                            {status === 'accepted' && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-lg animate-bounce">
                                    {formatTime(etaSeconds)}
                                </div>
                            )}
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#00D68F] transform -rotate-90">
                                <Car size={18} className="text-black" fill="currentColor" />
                            </div>
                        </div>
                    </div>
                )}

                {mapPins.map((pin, i) => (
                    <div key={`pin-${i}`} className="absolute z-10 animate-scale-in" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
                        <div className="relative -translate-x-1/2 -translate-y-full">
                            <MapPinFilled size={36} className="text-red-600 drop-shadow-lg filter" />
                            <div className="w-2 h-2 bg-black/20 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 blur-[1px]"></div>
                            {pin.label && (
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white dark:bg-black px-2 py-1 rounded shadow-md text-[10px] font-bold border border-gray-100 dark:border-gray-800">
                                    {pin.label}
                                </div>
                            )}
                        </div>
                        <div className="absolute -translate-x-1/2 -translate-y-full top-[-28px] left-0 w-full text-center text-[10px] font-bold text-white pointer-events-none">
                            {i + 1}
                        </div>
                    </div>
                ))}
            </div>

            {/* Back Button & Locate Me */}
            <div className="z-10 px-6 pt-safe flex items-center justify-between pointer-events-none">
                <button onClick={goBack} className={`w-10 h-10 rounded-full ${bgCard} shadow-lg flex items-center justify-center pointer-events-auto active:scale-90 transition-transform`}>
                    <ArrowLeft size={20} />
                </button>
                {status === 'idle' && (
                    <button
                        onClick={() => { triggerHaptic(); alert("Centering on location..."); }}
                        className={`w-10 h-10 rounded-full ${bgCard} shadow-lg flex items-center justify-center pointer-events-auto active:scale-90 transition-transform`}
                    >
                        <Locate size={20} />
                    </button>
                )}
            </div>

            {/* Bottom Card / Draggable Sheet */}
            <div
                className={`absolute bottom-0 left-0 right-0 z-20 ${bgCard} rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col max-h-[85vh] transition-transform duration-300 ease-out`}
                style={{
                    transform: sheetTransform,
                    transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
            >
                {/* Drag Handle */}
                <div
                    className="w-full pt-4 pb-2 flex justify-center cursor-grab active:cursor-grabbing touch-none"
                    onTouchStart={handleSheetTouchStart}
                    onTouchMove={handleSheetTouchMove}
                    onTouchEnd={handleSheetTouchEnd}
                >
                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0"></div>
                </div>

                <div className="flex-1 overflow-y-auto min-h-0 p-6 pt-2 pb-safe">
                    {status === 'idle' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold">Plan your ride</h2>

                            <div className="relative pl-4 space-y-4">
                                <div className="absolute left-[23px] top-4 bottom-8 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                                <div className="relative flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full border-[3px] border-blue-500 bg-white dark:bg-black z-10 flex-shrink-0 shadow-sm"></div>
                                    <div className={`flex-1 p-3.5 rounded-xl ${inputBg} font-medium text-sm ${textSec} flex items-center justify-between`}>
                                        <span>Current Location</span>
                                        <Locate size={14} className="opacity-50" />
                                    </div>
                                </div>

                                {destinations.map((dest, idx) => (
                                    <div key={idx} className="relative flex items-center gap-3 animate-scale-in">
                                        <div className="w-4 h-4 rounded-full border-[3px] border-red-500 bg-white dark:bg-black z-10 flex-shrink-0 shadow-sm"></div>
                                        <div className={`flex-1 flex items-center gap-2 p-3.5 rounded-xl ${inputBg} focus-within:ring-2 ring-[#00D68F] transition-all`}>
                                            <input
                                                placeholder={idx === 0 ? "Where to? (Tap map to pin)" : "Add a stop"}
                                                className="bg-transparent outline-none flex-1 font-bold text-sm"
                                                value={dest}
                                                onChange={(e) => updateDestination(idx, e.target.value)}
                                            />
                                            {destinations.length > 1 && (
                                                <button onClick={() => removeDestination(idx)} className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                                    <X size={14} className="opacity-50" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <div className="relative flex items-center gap-3 pl-0.5">
                                    <div className="w-3.5 flex justify-center"><Plus size={14} className="text-[#00D68F]" /></div>
                                    <button onClick={addDestination} className="text-sm font-bold text-[#00D68F] active:opacity-60">Add Stop</button>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-3 px-1">
                                    <h3 className="font-bold text-sm">Choose a ride</h3>
                                    <div className={`flex items-center gap-1 text-[10px] ${textSec}`}>
                                        <Info size={12} /> Min. fare D{minFare}
                                    </div>
                                </div>
                                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-1 snap-x">
                                    {tiers.map(t => {
                                        const isSelected = selectedTier === t.id;
                                        const price = calculatePrice(t.mult);
                                        return (
                                            <div
                                                key={t.id}
                                                onClick={() => { triggerHaptic(); setSelectedTier(t.id); }}
                                                className={`
                                            relative min-w-[140px] p-4 rounded-3xl border-2 cursor-pointer transition-all duration-300 snap-start flex flex-col
                                            ${isSelected
                                                        ? 'border-[#00D68F] bg-[#00D68F]/10 scale-105 shadow-lg ring-4 ring-[#00D68F]/20'
                                                        : 'border-transparent bg-gray-100 dark:bg-gray-800 hover:scale-[1.02] active:scale-95'
                                                    }
                                        `}
                                            >
                                                {isSelected && (
                                                    <div className="absolute -top-3 -right-2 bg-[#00D68F] text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-scale-in z-10">
                                                        SELECTED
                                                    </div>
                                                )}
                                                <div className={`mb-3 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-[#00D68F] text-white' : 'bg-white dark:bg-black text-gray-900 dark:text-gray-100'}`}>
                                                    <t.icon size={24} strokeWidth={2.5} />
                                                </div>
                                                <div className={`font-bold text-base mb-0.5 ${isSelected ? 'text-black dark:text-white' : 'text-gray-900 dark:text-white'}`}>{t.label}</div>
                                                <div className={`text-xs mb-3 ${isSelected ? textSec : 'text-gray-500 dark:text-gray-400'}`}>{t.desc} • {t.time}</div>
                                                <div className={`font-bold text-xl mt-auto ${isSelected ? 'text-[#00D68F]' : 'text-gray-900 dark:text-white'}`}>D{price}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className={`flex p-1 rounded-xl ${inputBg}`}>
                                    <button onClick={() => setRidePayMethod('wave')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${ridePayMethod === 'wave' ? 'bg-[#1E88E5] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Wave</button>
                                    <button onClick={() => setRidePayMethod('cash')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${ridePayMethod === 'cash' ? 'bg-[#00D68F] text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Cash</button>
                                </div>

                                <button
                                    onClick={confirmRide}
                                    disabled={!destinations[0]}
                                    className={`w-full bg-[#00D68F] text-black py-4 rounded-full font-bold text-lg shadow-xl disabled:opacity-50 disabled:shadow-none flex items-center justify-between px-6 active:scale-[0.98] transition-transform`}
                                >
                                    <span>Book {tiers.find(t => t.id === selectedTier)?.label}</span>
                                    <span>D{currentPrice}</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {(status === 'searching' || status === 'accepted' || status === 'arrived' || status === 'in-progress') && (
                        <div className="text-center py-4">
                            {status === 'searching' && <div className="w-16 h-16 border-4 border-[#00D68F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>}

                            {(status === 'accepted' || status === 'arrived' || status === 'in-progress') && (
                                <div className="animate-scale-in px-2">
                                    <div className={`p-5 rounded-[24px] ${inputBg} shadow-sm mb-6`}>
                                        <div className="flex justify-between items-start mb-5">
                                            <div className="text-left">
                                                <div className="text-[#00D68F] font-bold text-3xl mb-1 tabular-nums">
                                                    {status === 'in-progress' ? 'On Trip' : (status === 'arrived' ? 'Arrived' : formatTime(etaSeconds))}
                                                </div>
                                                <div className={`${textSec} text-sm font-medium`}>
                                                    {status === 'in-progress' ? `Heading to ${destinations[0]}` : (status === 'arrived' ? 'Driver is waiting' : 'Estimated arrival')}
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <div className="w-16 h-16 rounded-full bg-gray-300 bg-[url('https://i.pravatar.cc/300?img=11')] bg-cover border-4 border-white dark:border-[#1C1C1E] shadow-md"></div>
                                                <div className={`absolute -bottom-2 right-1 px-1.5 py-0.5 rounded-full border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-1 ${3.8 >= 4.5 ? 'bg-[#00D68F]/10 text-[#00D68F]' :
                                                        3.8 >= 3.0 ? 'bg-orange-500/10 text-orange-500' :
                                                            'bg-red-500/10 text-red-500'
                                                    }`}>
                                                    <Star size={10} fill="currentColor" />
                                                    <span className="text-[10px] font-black">3.8</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-px w-full bg-black/5 dark:bg-white/10 my-4"></div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#00D68F]/10 flex items-center justify-center text-[#00D68F]">
                                                    <Car size={20} />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-bold text-base">Toyota Prius</div>
                                                    <div className={`${textSec} text-xs font-medium`}>Silver • Sedan</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-0.5">Plate</div>
                                                <div className="font-mono font-bold text-lg bg-white dark:bg-black/40 px-2 py-1 rounded-lg border border-black/5 dark:border-white/10">BJL 4229</div>
                                            </div>
                                        </div>
                                    </div>

                                    {status !== 'in-progress' && (
                                        <div className="flex gap-3">
                                            <button className={`flex-1 py-4 rounded-2xl ${theme === 'light' ? 'bg-white border border-gray-100' : 'bg-[#2C2C2E] border border-white/5'} font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all`}>
                                                <Phone size={20} className="text-[#00D68F]" /> <span>Call</span>
                                            </button>
                                            <button className={`flex-1 py-4 rounded-2xl ${theme === 'light' ? 'bg-white border border-gray-100' : 'bg-[#2C2C2E] border border-white/5'} font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all`}>
                                                <MessageSquare size={20} className="text-[#00D68F]" /> <span>Message</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {status === 'arrived' && <button onClick={startTrip} className="w-full bg-[#00D68F] text-black py-4 rounded-full font-bold shadow-lg mt-6">Start Trip</button>}

                            {status === 'in-progress' && (
                                <div className="mt-6 space-y-4">
                                    <div className="bg-[#00D68F]/10 p-4 rounded-xl flex items-center justify-center gap-2 text-[#00D68F] font-bold text-sm">
                                        <Navigation size={18} /> You are on your way
                                    </div>
                                    <button onClick={completeTrip} className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full font-bold shadow-lg">Complete Ride</button>
                                </div>
                            )}

                            {status === 'searching' && (
                                <>
                                    <h3 className="text-xl font-bold mb-1">Finding driver...</h3>
                                    <p className={`${textSec} mb-6`}>Connecting with nearby drivers</p>
                                    <button onClick={() => setStatus('idle')} className="text-red-500 font-bold">Cancel</button>
                                </>
                            )}
                        </div>
                    )}

                    {status === 'review' && (
                        <div className="text-center animate-scale-in">
                            <h3 className="text-xl font-bold mb-4">How was your ride?</h3>
                            <p className={`${textSec} mb-6`}>Your feedback helps us improve.</p>
                            <div className="flex justify-center gap-3 mb-8">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <button key={s} onClick={() => setRating(s)} className="active:scale-90 transition-transform">
                                        <Star size={40} className={s <= rating ? "text-orange-400 fill-orange-400" : "text-gray-300 dark:text-gray-700"} strokeWidth={s <= rating ? 0 : 2} />
                                    </button>
                                ))}
                            </div>
                            <textarea
                                placeholder="Leave a comment (optional)..."
                                className={`w-full p-4 rounded-2xl ${inputBg} mb-6 outline-none resize-none h-32`}
                            />
                            <button onClick={submitReview} className="w-full bg-[#00D68F] text-black py-4 rounded-full font-bold shadow-lg">Submit Review</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
