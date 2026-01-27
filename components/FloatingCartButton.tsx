import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { triggerHaptic } from '../index';
import { CartItem, Theme } from '../types';

interface Props {
    cart: CartItem[];
    theme: Theme;
    onClick: () => void;
}

export const FloatingCartButton = ({ cart, theme, onClick }: Props) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 }); // Offset from default bottom-right
    const [rel, setRel] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLDivElement>(null);

    if (cart.length === 0) return null;

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        if ((e.target as HTMLElement).closest('button')) return;

        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        setRel({
            x: clientX - position.x,
            y: clientY - position.y
        });
        e.stopPropagation();
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        setPosition({
            x: clientX - rel.x,
            y: clientY - rel.y
        });
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('touchmove', onMouseMove);
            window.addEventListener('touchend', onMouseUp);
        } else {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onMouseMove);
            window.removeEventListener('touchend', onMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onMouseMove);
            window.removeEventListener('touchend', onMouseUp);
        };
    }, [isDragging]);

    const bg = theme === 'light' ? 'bg-black' : 'bg-white';
    const text = theme === 'light' ? 'text-white' : 'text-black';

    return (
        <div
            ref={buttonRef}
            onMouseDown={onMouseDown}
            onTouchStart={onMouseDown}
            onClick={(e) => {
                // If we barely moved, treat as click
                if (Math.abs(position.x) < 5 && Math.abs(position.y) < 5) {
                    triggerHaptic();
                    onClick();
                }
            }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 ${bg} ${text} px-4 py-3 rounded-full shadow-2xl cursor-move active:scale-98 transition-transform animate-scale-in blur-none select-none`}
            style={{
                filter: 'drop-shadow(0 0 10px rgba(0, 214, 143, 0.3))',
                transform: `translate(${position.x}px, ${position.y}px)`
            }}
        >
            <div className="relative pointer-events-none">
                <ShoppingCart size={20} />
                <div className="absolute -top-2 -right-2 bg-[#00D68F] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-inherit">
                    {totalItems}
                </div>
            </div>
            <div className="flex flex-col items-start leading-none pointer-events-none">
                <span className="text-[10px] font-bold uppercase opacity-60 tracking-tighter">Your Cart</span>
                <span className="text-sm font-black">D{totalPrice.toFixed(0)}</span>
            </div>
        </div>
    );
};
