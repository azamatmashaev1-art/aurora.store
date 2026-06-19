import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Scale, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/lib/data';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCompareStore } from '@/store/compareStore';
import { QuickViewModal } from '@/components/QuickViewModal';
import { Product } from '@/store/cartStore';
import { useTranslation, formatPrice } from '@/lib/i18n';

export default function Home() {
  const bestSellers = mockProducts.slice(0, 4);
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const { isInCompare, addItem: addToCompare, removeItem: removeFromCompare, items: compareItems } = useCompareStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { t, lang } = useTranslation();

  return (
    <div className="w-full flex-1 flex flex-col pt-6 pb-6">
      
      {/* Hero Section */}
      <section className="px-4 sm:px-10 mb-8 max-w-7xl mx-auto w-full">
        <div className="rounded-[24px] bg-gradient-to-br from-[#000] to-[#222] p-10 md:p-14 flex flex-col justify-center text-white relative overflow-hidden text-center md:text-left h-[300px] md:h-[400px]">
           <img 
             src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2000&auto=format&fit=crop" 
             alt="iPhone Titanium" 
             className="absolute inset-0 w-full h-full object-cover object-center opacity-60 mix-blend-overlay md:mix-blend-normal md:opacity-50"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-0"></div>
           <div className="relative z-10 w-full h-full flex flex-col justify-center space-y-4 max-w-[600px]">
             <div className="text-[12px] uppercase tracking-[1px] opacity-70 mb-1">{t('bannerTitle')}</div>
             <h1 className="text-[36px] md:text-[52px] leading-[1.1] font-bold">
               {t('bannerSubtitle')}
             </h1>
             <Button className="bg-white text-black hover:bg-slate-200 rounded-[30px] px-8 py-6 h-auto w-fit font-bold text-[16px] mt-4" asChild>
               <Link to="/category">{t('bannerButton')}</Link>
             </Button>
           </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-4 sm:px-10 mb-12 max-w-7xl mx-auto w-full">
         <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { icon: '📱', name: 'iPhone', filter: 'iPhone' },
              { icon: '💻', name: 'Mac', filter: 'Mac' },
              { icon: '📱', name: 'iPad', filter: 'iPad' },
              { icon: '⌚️', name: 'Watch', filter: 'Watch' },
              { icon: '🎧', name: 'AirPods', filter: 'AirPods' },
              { icon: '🔊', name: 'Аудио', filter: 'Audio' },
              { icon: '✨', name: 'Dyson', filter: 'Dyson' },
              { icon: '🎮', name: 'Гаджеты', filter: 'Гаджеты' }
            ].map((item, i) => (
              <Link key={i} to={`/category?filter=${encodeURIComponent(item.filter)}`} className="bg-[#F5F5F7] rounded-[20px] p-4 flex flex-col items-center justify-center text-center hover:bg-[#E5E5E7] transition-colors">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-[13px] font-semibold text-[#1D1D1F]">{item.name}</div>
              </Link>
            ))}
         </div>
      </section>

      {/* Product Shelf */}
      <section className="px-4 sm:px-10 pb-10 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[20px] font-bold">{t('bestSellers')}</h2>
          <Link to="/category" className="text-[#0F62FE] font-semibold text-[14px] hover:underline">
            {t('viewAll')} →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {bestSellers.map((product, i) => (
            <div key={product.id} className="group relative flex flex-col">
              <Link to={`/product/${product.id}`} className="hover:opacity-80 transition-opacity">
                <div className="bg-[#F5F5F7] h-[200px] rounded-[24px] mb-3 relative flex items-center justify-center overflow-hidden shrink-0 p-6">
                  <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
                  {i === 0 && (
                    <div className="absolute top-4 left-4 bg-black text-white text-[11px] px-2 py-1 rounded-[6px] font-semibold tracking-widest">NEW</div>
                  )}
                </div>
              </Link>
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                    } else {
                      addToWishlist(product);
                    }
                  }}
                  className="bg-white p-2 rounded-full shadow-md z-10 hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (isInCompare(product.id)) {
                      removeFromCompare(product.id);
                    } else {
                      if (compareItems.length < 2) addToCompare(product);
                      else alert(t('compareMax'));
                    }
                  }}
                  className="bg-white p-2 rounded-full shadow-md z-10 hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Scale className={`w-4 h-4 ${isInCompare(product.id) ? 'text-[#0F62FE]' : 'text-slate-400'}`} />
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setQuickViewProduct(product);
                  }}
                  className="bg-white p-2 rounded-full shadow-md z-10 hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              <Link to={`/product/${product.id}`} className="hover:opacity-80 transition-opacity">
                <div className="font-bold text-[18px] text-[#1D1D1F] mb-1">{formatPrice(product.price, lang)}</div>
                <div className="text-[14px] text-[#1D1D1F] leading-tight line-clamp-2">{product.title}</div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Brands Grid */}
      <section className="px-4 sm:px-10 pb-16 max-w-7xl mx-auto w-full">
         <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Apple', icon: '🍎' },
              { name: 'Dyson', icon: '✨' },
              { name: 'Sony', icon: '🎧' },
              { name: 'Marshall', icon: '🎸' },
              { name: 'JBL', icon: '🎵' },
              { name: 'Garmin', icon: '⌚' },
              { name: 'DJI', icon: '🚁' },
              { name: 'Bose', icon: '🔊' },
              { name: 'Yandex', icon: 'Я' },
              { name: 'Beats', icon: 'b' },
              { name: 'GoPro', icon: '📷' },
              { name: 'Roborock', icon: '🤖' }
            ].map((brand, i) => (
               <Link key={i} to={`/category?brand=${encodeURIComponent(brand.name)}`} className="bg-[#F5F5F7] rounded-[20px] p-6 flex flex-col items-center justify-center text-center hover:bg-[#E5E5E7] transition-colors h-[120px]">
                 <div className="text-2xl mb-1 opacity-70">{brand.icon}</div>
                 <div className="font-bold text-[14px] text-[#1D1D1F] tracking-tight">{brand.name}</div>
               </Link>
            ))}
         </div>
      </section>

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}
