import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, HeartCrack, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { useTranslation, formatPrice } from '@/lib/i18n';

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const { t, lang } = useTranslation();

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col pt-6 pb-16 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <HeartCrack className="w-10 h-10 text-slate-300" />
          </div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#1D1D1F] mb-3">{t('wishlist')}</h1>
          <p className="text-[#86868B] mb-8 max-w-md text-center">Вы еще не добавили ни одного товара в ваш список желаний.</p>
          <Button className="bg-black text-white hover:bg-[#333] rounded-full px-8 h-12 text-base font-semibold" asChild>
            <Link to="/category">{t('catalog')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pt-12 pb-24 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="text-[32px] sm:text-[40px] font-bold tracking-tight text-[#1D1D1F] mb-10">{t('wishlist')}</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((product) => (
            <div key={product.id} className="group flex flex-col hover:opacity-80 transition-opacity relative">
              <Link to={`/product/${product.id}`}>
                <div className="bg-[#FFFFFF] h-[200px] sm:h-[240px] rounded-[24px] mb-3 relative flex items-center justify-center overflow-hidden shrink-0 p-6 shadow-sm">
                  <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
                </div>
              </Link>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  removeItem(product.id);
                }}
                className="absolute top-4 right-4 bg-white p-2 text-red-500 rounded-full shadow-md z-10 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="font-bold text-[18px] text-[#1D1D1F] mb-1">{formatPrice(product.price, lang)}</div>
              <Link to={`/product/${product.id}`} className="text-[14px] text-[#1D1D1F] leading-tight line-clamp-2 hover:underline">
                {product.title}
              </Link>
              <Button 
                className="mt-4 w-full bg-black text-white hover:bg-slate-800 rounded-full h-10" 
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product);
                  removeItem(product.id);
                }}
              >
                {t('addToCart')}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
