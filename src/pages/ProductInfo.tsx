import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Check, Star, Truck, ShieldCheck, Heart, Minus, Plus, Share2, Scale } from 'lucide-react';
import { fullCatalog } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCompareStore } from '@/store/compareStore';
import { useTranslation, formatPrice } from '@/lib/i18n';

export default function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = fullCatalog.find(p => p.id === id) || fullCatalog[0];
  
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const { isInCompare, addItem: addToCompare, removeItem: removeFromCompare, items: compareItems } = useCompareStore();
  const toggleCartOpen = () => navigate('/cart');
  const { t, lang } = useTranslation();

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleToggleCompare = () => {
    if (inCompare) {
      removeFromCompare(product.id);
    } else {
      if (compareItems.length < 2) addToCompare(product);
      else alert(t('compareMax'));
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toggleCartOpen();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
        <Link to="/" className="hover:text-[#1D1D1F]">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/category?filter=${encodeURIComponent(product.category)}`} className="hover:text-[#1D1D1F]">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1D1D1F] truncate max-w-xs">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Product Images */}
        <div className="space-y-4">
           <div className="aspect-square bg-white rounded-[24px] overflow-hidden border border-[#E5E5E7] p-8 flex items-center justify-center">
             <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
           </div>
           <div className="grid grid-cols-4 gap-4">
             {product.images.concat([product.image, product.image, product.image]).slice(0, 4).map((img, i) => (
                <div key={i} className="aspect-square bg-white rounded-[16px] overflow-hidden border border-[#E5E5E7] p-2 cursor-pointer hover:border-[#0F62FE] transition-colors flex items-center justify-center">
                  <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
             ))}
           </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-8">
            <h2 className="text-[12px] font-bold text-[#86868B] uppercase tracking-widest mb-2">{product.brand}</h2>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] mb-4 leading-tight">{product.title}</h1>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <p className="text-[32px] sm:text-[40px] tracking-tight font-bold text-[#1D1D1F]">{formatPrice(product.price, lang)}</p>
                {product.stock > 0 ? (
                  <span className="inline-flex items-center text-[12px] font-bold text-white bg-black px-3 py-1 rounded-full">
                    <Check className="w-4 h-4 mr-1" /> {t('inStock')} ({product.stock})
                  </span>
                ) : (
                  <span className="inline-flex items-center text-sm font-medium text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full">
                    {t('outOfStock')}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center text-sm font-medium text-slate-500 mb-6">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-slate-200 text-slate-200'}`} />
                ))}
              </div>
              <span>{product.rating} Рейтинг • 12 Отзывов</span>
            </div>

            <p className="text-slate-600 leading-relaxed text-base">{product.description}</p>
          </div>

          <div className="border-t border-[#E5E5E7] py-8 mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="font-semibold text-[#1D1D1F]">Количество</div>
              <div className="flex items-center border border-[#E5E5E7] rounded-full bg-white p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F5F7] transition-all"
                >
                  <Minus className="w-4 h-4 text-[#1D1D1F]" />
                </button>
                <span className="w-12 text-center font-bold text-[14px] text-[#1D1D1F]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F5F7] transition-all"
                >
                  <Plus className="w-4 h-4 text-[#1D1D1F]" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button size="lg" className="w-full h-14 rounded-full text-base font-semibold bg-black text-white hover:bg-slate-800" onClick={handleAddToCart}>
                {t('addToCart')}
              </Button>
              <Button size="lg" variant="outline" className="w-full h-14 rounded-full text-base font-semibold border-black text-black hover:bg-slate-100" onClick={() => { handleAddToCart(); navigate('/checkout'); }}>
                {t('checkout')}
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-8 mt-6">
               <button onClick={handleToggleWishlist} className={`flex items-center text-sm font-medium transition-colors ${inWishlist ? 'text-red-500 hover:text-red-600' : 'text-slate-500 hover:text-slate-900'}`}>
                 <Heart className={`w-4 h-4 mr-2 ${inWishlist ? 'fill-current' : ''}`} /> {t('wishlist')}
               </button>
               <button onClick={handleToggleCompare} className={`flex items-center text-sm font-medium transition-colors ${inCompare ? 'text-[#0F62FE] hover:text-blue-700' : 'text-slate-500 hover:text-slate-900'}`}>
                 <Scale className={`w-4 h-4 mr-2`} /> {t('compare')}
               </button>
               <button className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                 <Share2 className="w-4 h-4 mr-2" /> {t('share')}
               </button>
            </div>
          </div>

          {/* Guarantees */}
          <div className="space-y-4 bg-[#F5F5F7] p-6 rounded-[20px]">
             <div className="flex items-start">
                <Truck className="w-5 h-5 text-slate-400 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Быстрая доставка</h4>
                  <p className="text-slate-500 text-sm">Бесплатная доставка по городу при заказе от 50 000 сом.</p>
                </div>
             </div>
             <div className="flex items-start">
                <ShieldCheck className="w-5 h-5 text-slate-400 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Официальная гарантия</h4>
                  <p className="text-slate-500 text-sm">Только оригинальная техника от проверенных брендов.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-20 border-t border-[#E5E5E7] pt-12">
        <h3 className="text-2xl font-bold text-[#1D1D1F] mb-8">{t('reviews')}</h3>
        
        <div className="flex flex-col lg:flex-row gap-12">
           <div className="lg:w-1/3">
              <div className="bg-[#F5F5F7] p-8 rounded-[24px]">
                 <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl font-bold text-[#1D1D1F]">{product.rating}</span>
                    <span className="text-slate-500">из 5</span>
                 </div>
                 <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className={`w-5 h-5 ${idx < Math.floor(product.rating) ? 'fill-[#0F62FE] text-[#0F62FE]' : 'text-slate-300'}`} />
                    ))}
                 </div>
                 <Button className="w-full bg-[#0F62FE] text-white hover:bg-[#0F62FE]/90 rounded-full h-12">{t('writeReview')}</Button>
              </div>
           </div>
           
           <div className="lg:w-2/3 space-y-8">
              {[
                { name: 'Александр', date: '2 недели назад', rating: 5, comment: 'Отличное устройство! Полностью оправдывает свою цену. Рекомендую к покупке.' },
                { name: 'Елена', date: '1 месяц назад', rating: 4, comment: 'Все нравится, но доставка заняла чуть больше времени, чем ожидала. Сам товар супер.' },
                { name: 'Дастан', date: '2 месяца назад', rating: 5, comment: 'Покупал в подарок, все в восторге. Качество на высоте, как всегда у этого бренда.' }
              ].map((review, idx) => (
                 <div key={idx} className="border-b border-[#E5E5E7] pb-8 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-4">
                       <div className="font-semibold text-[#1D1D1F]">{review.name}</div>
                       <div className="text-sm text-slate-500">{review.date}</div>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                       {Array.from({ length: 5 }).map((_, sIdx) => (
                         <Star key={sIdx} className={`w-4 h-4 ${sIdx < review.rating ? 'fill-[#FBBC04] text-[#FBBC04]' : 'text-slate-300'}`} />
                       ))}
                    </div>
                    <p className="text-slate-600 leading-relaxed">{review.comment}</p>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
