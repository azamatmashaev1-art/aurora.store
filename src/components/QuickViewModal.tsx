import React from 'react';
import { X, Check } from 'lucide-react';
import { Product } from '@/store/cartStore';
import { Button } from './ui/button';
import { useCartStore } from '@/store/cartStore';
import { useTranslation, formatPrice } from '@/lib/i18n';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { t, lang } = useTranslation();

  const handleAddToCart = () => {
    addItem(product, 1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white max-w-4xl w-full rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]" 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white hover:bg-slate-100 rounded-full transition-colors z-10 md:text-slate-500 hover:text-red-500 shadow-sm md:shadow-none">
          <X className="w-5 h-5" />
        </button>

        <div className="md:w-1/2 bg-[#F5F5F7] p-8 flex items-center justify-center shrink-0 min-h-[300px]">
          <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply max-h-[400px]" />
        </div>

        <div className="md:w-1/2 p-6 md:p-10 overflow-y-auto">
          <div className="text-xs font-bold text-[#86868B] uppercase tracking-widest mb-2">{product.brand}</div>
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4">{product.title}</h2>
          
          <div className="flex items-center space-x-4 mb-6">
            <p className="text-[28px] font-bold text-[#1D1D1F]">{formatPrice(product.price, lang)}</p>
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

          <p className="text-slate-600 leading-relaxed text-sm mb-8">{product.description}</p>
          
          <Button size="lg" className="w-full h-12 rounded-full text-base font-semibold bg-[#0F62FE] text-white hover:bg-[#0F62FE]/90" onClick={handleAddToCart}>
            {t('addToCart')}
          </Button>
        </div>
      </div>
    </div>
  );
}
