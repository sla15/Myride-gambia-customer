
import React, { useState } from 'react';
import { ArrowLeft, MapPin, ChevronRight, Truck, Plus, Minus, Trash2 } from 'lucide-react';
import { Theme, Screen, CartItem, UserData } from '../types';
import { triggerHaptic } from '../index';

interface Props {
  theme: Theme;
  navigate: (scr: Screen) => void;
  goBack: () => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  user: UserData;
}

export const CheckoutScreen = ({ theme, navigate, goBack, cart, setCart, user }: Props) => {
     const subtotal = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
     const deliveryFee = 50;
     const total = subtotal + deliveryFee;
     
     const [deliveryNote, setDeliveryNote] = useState('');

     const bgMain = theme === 'light' ? 'bg-[#F2F2F7]' : 'bg-[#000000]';
     const bgCard = theme === 'light' ? 'bg-[#FFFFFF]' : 'bg-[#1C1C1E]';
     const textMain = theme === 'light' ? 'text-[#000000]' : 'text-[#FFFFFF]';
     const textSec = theme === 'light' ? 'text-[#8E8E93]' : 'text-[#98989D]';
     const inputBg = theme === 'light' ? 'bg-[#E5E5EA]' : 'bg-[#2C2C2E]';
     const separator = theme === 'light' ? 'border-[#C6C6C8]' : 'border-[#38383A]';

     const updateQuantity = (itemId: string, delta: number) => {
        triggerHaptic();
        setCart(prev => {
            return prev.map(item => {
                if (item.id === itemId) {
                    return { ...item, quantity: Math.max(0, item.quantity + delta) };
                }
                return item;
            }).filter(item => item.quantity > 0);
        });
     };

     return (
       <div className={`h-full flex flex-col ${bgMain} ${textMain} animate-slide-in`}>
          {/* Consistent Header */}
          <div className={`pt-safe px-4 pb-4 flex items-center gap-4 ${bgMain} sticky top-0 z-10 border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
             <button onClick={goBack} className={`p-2 rounded-full ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-800'} transition-colors`}>
                 <ArrowLeft size={24}/>
             </button>
             <h1 className="text-xl font-bold">Checkout</h1>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 pt-4 pb-32">
             
             {/* Delivery Location Section */}
             <div className={`${bgCard} rounded-2xl p-4 mb-6 shadow-sm`}>
                <h2 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wide opacity-70">
                    <MapPin size={16} className="text-[#00D68F]"/> Dropoff Location
                </h2>
                <div 
                    onClick={() => { triggerHaptic(); alert("Location selection would open here."); }}
                    className={`flex items-center justify-between p-3 rounded-xl ${inputBg} cursor-pointer active:opacity-80`}
                >
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-black flex items-center justify-center">
                          <MapPin size={16} />
                      </div>
                      <div>
                          <div className="text-sm font-bold">Home</div>
                          <div className={`text-xs ${textSec}`}>{user.location}</div>
                      </div>
                   </div>
                   <ChevronRight size={16} className="opacity-40" />
                </div>
                
                <div className="mt-4">
                    <label className={`text-xs font-bold ${textSec} mb-2 block`}>Delivery Instructions</label>
                    <input 
                        value={deliveryNote}
                        onChange={(e) => setDeliveryNote(e.target.value)}
                        placeholder="e.g. Call when outside" 
                        className={`w-full p-3 rounded-xl ${inputBg} outline-none text-sm font-medium`} 
                    />
                </div>
             </div>

             {/* Order Summary */}
             <div className={`${bgCard} rounded-2xl p-4 mb-6 shadow-sm`}>
                <h2 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wide opacity-70">
                    <Truck size={16} className="text-[#00D68F]"/> Order Summary
                </h2>
                
                {cart.length === 0 ? (
                    <div className={`text-center py-6 ${textSec} text-sm`}>Your cart is empty.</div>
                ) : (
                    <div className="space-y-6 mb-6">
                    {cart.map(item => (
                        <div key={item.id} className="flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <span className="font-bold text-sm max-w-[200px]">{item.name}</span>
                                <span className="font-bold text-sm">D{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <p className={`text-xs ${textSec}`}>D{item.price} each</p>
                                
                                <div className={`flex items-center gap-3 p-1 rounded-lg ${inputBg}`}>
                                    <button 
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="w-7 h-7 flex items-center justify-center rounded-md bg-white dark:bg-black shadow-sm active:scale-90 transition-transform"
                                    >
                                        {item.quantity === 1 ? <Trash2 size={14} className="text-red-500"/> : <Minus size={14}/>}
                                    </button>
                                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="w-7 h-7 flex items-center justify-center rounded-md bg-white dark:bg-black shadow-sm active:scale-90 transition-transform"
                                    >
                                        <Plus size={14}/>
                                    </button>
                                </div>
                            </div>
                            <div className={`h-px ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}></div>
                        </div>
                    ))}
                    </div>
                )}
                
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                        <span className={textSec}>Subtotal</span>
                        <span className="font-medium">D{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className={textSec}>Delivery Fee</span>
                        <span className="font-medium">D{deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className={`h-px ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} my-2`}></div>
                    <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <span>D{total.toFixed(2)}</span>
                    </div>
                </div>
             </div>
          </div>
          
          <div className={`p-4 ${bgCard} pb-safe border-t ${separator}`}>
             <button 
                onClick={() => { 
                    if(cart.length === 0) return;
                    triggerHaptic(); 
                    setCart([]); 
                    navigate('dashboard'); 
                    alert('Order Placed!'); 
                }} 
                disabled={cart.length === 0}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full font-bold text-lg shadow-lg active:scale-[0.98] transition-transform flex justify-between px-6 items-center disabled:opacity-50"
             >
                <span>Place Order</span>
                <span>D{total.toFixed(2)}</span>
             </button>
          </div>
       </div>
     );
};
