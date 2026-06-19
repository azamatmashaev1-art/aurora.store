import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { useTranslation, formatPrice } from '@/lib/i18n';

export default function Cart() {
  const { items, updateQuantity, removeItem, cartTotal } = useCartStore();
  const navigate = useNavigate();
  const { t, lang } = useTranslation();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
           <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{t('cartEmpty')}</h1>
        <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button size="lg" className="rounded-full px-8" asChild>
          <Link to="/category">{t('continueShopping')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-10">{t('cart')}</h1>
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div className="flex-1 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-[24px] p-6 border border-[#E5E5E7] flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
              <div className="w-24 h-24 bg-[#F9F9FB] rounded-[16px] overflow-hidden shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-[#86868B] uppercase tracking-widest mb-1">{item.brand}</p>
                    <Link to={`/product/${item.id}`} className="font-semibold text-[15px] text-[#1D1D1F] hover:text-[#0F62FE] transition-colors line-clamp-2 pr-4">{item.title}</Link>
                    <p className="text-[14px] font-bold text-[#1D1D1F] mt-1">{formatPrice(item.price, lang)}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-[#86868B] hover:text-red-500 transition-colors p-2 -mr-2 bg-[#F5F5F7] rounded-full">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-[#E5E5E7] rounded-full bg-white p-1 w-fit">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F5F5F7] transition-all"><Minus className="w-3 h-3 text-[#1D1D1F]" /></button>
                    <span className="w-8 text-center font-bold text-[13px] text-[#1D1D1F]">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F5F5F7] transition-all"><Plus className="w-3 h-3 text-[#1D1D1F]" /></button>
                  </div>
                  <p className="font-bold text-[16px] text-[#1D1D1F]">{formatPrice(item.price * item.quantity, lang)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white rounded-[24px] p-8 border border-[#E5E5E7] sticky top-28">
             <h2 className="text-[20px] font-bold text-[#1D1D1F] mb-6">Order Summary</h2>
             
             <div className="space-y-4 mb-6 border-b border-[#E5E5E7] pb-6">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#86868B]">Subtotal</span>
                  <span className="font-semibold text-[#1D1D1F]">{formatPrice(cartTotal(), lang)}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#86868B]">Shipping</span>
                  <span className="font-semibold text-[#1D1D1F]">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#86868B]">Tax</span>
                  <span className="font-semibold text-[#1D1D1F]">Calculated at checkout</span>
                </div>
             </div>
             
             <div className="flex justify-between items-center mb-8">
               <span className="text-[16px] font-bold text-[#1D1D1F]">{t('total')}</span>
               <span className="text-[24px] font-bold text-[#1D1D1F]">{formatPrice(cartTotal(), lang)}</span>
             </div>
             
             <Button size="lg" className="w-full bg-black text-white hover:bg-[#333] rounded-full h-14 text-base shadow-lg hover:shadow-xl transition-shadow" onClick={() => navigate('/checkout')}>
               {t('checkout')} <ArrowRight className="w-4 h-4 ml-2" />
             </Button>
             
             <div className="mt-6 flex justify-center gap-2 grayscale opacity-50">
                {/* Simulated payment icons */}
                <div className="w-8 h-5 bg-slate-300 rounded" />
                <div className="w-8 h-5 bg-slate-300 rounded" />
                <div className="w-8 h-5 bg-slate-300 rounded" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
