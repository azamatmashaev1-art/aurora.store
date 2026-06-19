import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Lock } from 'lucide-react';
import { useTranslation, formatPrice } from '@/lib/i18n';

export default function Checkout() {
  const { cartTotal, items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const { t, lang } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 4000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Order Confirmed</h1>
        <p className="text-lg text-slate-500 mb-8">Thank you for your purchase. Your premium order is being prepared for immediate dispatch.</p>
        <p className="text-sm font-medium text-slate-400">Redirecting to homepage...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Checkout Form */}
        <div className="flex-1">
          <div className="flex items-center mb-8">
            <h1 className="text-[28px] font-bold tracking-tight text-[#1D1D1F]">{t('checkout')}</h1>
            <div className="ml-auto flex items-center text-[13px] font-medium text-[#86868B] bg-white border border-[#E5E5E7] px-3 py-1 rounded-full">
              <Lock className="w-3 h-3 mr-1.5" /> Secure Encrypted
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Contact */}
            <section>
              <h2 className="text-[18px] font-semibold mb-6 text-[#1D1D1F]">Contact Information</h2>
              <div className="space-y-4">
                <Input type="email" placeholder="Email Address *" className="rounded-[12px] h-12" required />
                <Input type="tel" placeholder="Phone Number" className="rounded-[12px] h-12" />
              </div>
            </section>
            
            {/* Shipping */}
            <section>
              <h2 className="text-[18px] font-semibold mb-6 text-[#1D1D1F]">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name *" className="rounded-[12px] h-12" required />
                  <Input placeholder="Last Name *" className="rounded-[12px] h-12" required />
                </div>
                <Input placeholder="Address Line 1 *" className="rounded-[12px] h-12" required />
                <Input placeholder="Apartment, suite, etc. (optional)" className="rounded-[12px] h-12" />
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <Input placeholder="City *" className="rounded-[12px] h-12" required />
                  <Input placeholder="State/Province *" className="rounded-[12px] h-12" required />
                  <Input placeholder="ZIP / Postal Code *" className="rounded-[12px] h-12 lg:col-span-1 col-span-2" required />
                </div>
              </div>
            </section>
            
            {/* Payment Implementation Note */}
            <section>
              <h2 className="text-[18px] font-semibold mb-6 text-[#1D1D1F]">Payment</h2>
              <div className="bg-white p-6 rounded-[20px] border border-[#E5E5E7]">
                <p className="text-[13px] text-[#86868B] font-medium mb-4">This is a simulated secure checkout environment prepared for Tribe Payment Gateway or Stripe integration.</p>
                <div className="space-y-4">
                  <Input placeholder="Card Number" required disabled className="bg-[#F9F9FB] rounded-[12px] h-12 border-transparent" value="4242 4242 4242 4242" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM/YY" required disabled className="bg-[#F9F9FB] rounded-[12px] h-12 border-transparent" value="12/26" />
                    <Input placeholder="CVC" required disabled className="bg-[#F9F9FB] rounded-[12px] h-12 border-transparent" value="123" />
                  </div>
                </div>
              </div>
            </section>
            
            <Button size="lg" className="w-full bg-black text-white hover:bg-[#333] rounded-full h-14 text-[16px] font-bold shadow-lg" type="submit">
              Оплатить {formatPrice(cartTotal(), lang)}
            </Button>
          </form>
        </div>
        
        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-[450px]">
           <div className="bg-white rounded-[24px] p-8 border border-[#E5E5E7] sticky top-28">
              <h2 className="text-[18px] font-bold text-[#1D1D1F] mb-6">In Your Bag</h2>
              <div className="space-y-6 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                     <div className="w-16 h-16 bg-[#F9F9FB] rounded-[12px] border border-[#E5E5E7] overflow-hidden shrink-0 relative">
                       <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" />
                       <div className="absolute -top-2 -right-2 bg-[#1D1D1F] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                         {item.quantity}
                       </div>
                     </div>
                     <div className="flex-1 flex flex-col justify-center">
                       <p className="text-[14px] font-semibold text-[#1D1D1F] line-clamp-1">{item.title}</p>
                       <p className="text-[11px] text-[#86868B] uppercase tracking-widest mt-1">{item.brand}</p>
                     </div>
                     <div className="flex items-center font-bold text-[14px]">
                       {formatPrice(item.price * item.quantity, lang)}
                     </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6 border-t border-[#E5E5E7] pt-6">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#86868B]">Subtotal</span>
                  <span className="font-semibold text-[#1D1D1F]">{formatPrice(cartTotal(), lang)}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#86868B]">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#86868B]">Taxes</span>
                  <span className="font-semibold text-[#1D1D1F]">{formatPrice(0, lang)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-[#E5E5E7] pt-6">
                <span className="text-[16px] font-bold text-[#1D1D1F]">{t('total')}</span>
                <span className="text-[24px] font-bold text-[#1D1D1F]">{formatPrice(cartTotal(), lang)}</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
