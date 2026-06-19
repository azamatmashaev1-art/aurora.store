import React from 'react';
import { X, Scale } from 'lucide-react';
import { useCompareStore } from '@/store/compareStore';
import { Button } from './ui/button';

export function CompareModal() {
  const { items, removeItem, clearCompare } = useCompareStore();

  if (items.length === 0) return null;

  // Collect all unique spec keys from compared items
  const allSpecKeys = Array.from(
    new Set(
      items.flatMap((item) => Object.keys(item.specs || {}))
    )
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white max-w-4xl w-full rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-[#E5E5E7] shrink-0">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#0F62FE]" />
            <h2 className="text-xl font-bold text-[#1D1D1F]">Сравнение устройств</h2>
          </div>
          <button onClick={clearCompare} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-red-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto w-full">
          {items.length === 1 ? (
            <div className="text-center py-12 flex flex-col items-center">
              <div className="w-48 h-48 mb-6 relative">
                <img src={items[0].image} alt={items[0].title} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <h3 className="text-lg font-bold mb-2">{items[0].title}</h3>
              <p className="text-slate-500 mb-6">Выберите второе устройство для сравнения</p>
              <Button variant="outline" onClick={clearCompare}>Отменить сравнение</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-8">
              {/* Product Headers */}
              {items.map((item) => (
                <div key={item.id} className="flex flex-col items-center text-center relative pt-4">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-0 right-0 p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="w-40 h-40 mb-4">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.brand}</div>
                  <h3 className="text-base font-bold text-[#1D1D1F] line-clamp-2 md:px-4">{item.title}</h3>
                  <div className="text-lg font-bold text-[#0F62FE] mt-2">{item.price.toLocaleString('ru-RU')} сом</div>
                </div>
              ))}

              {/* Specs Grid */}
              <div className="col-span-2 mt-8 border-t border-[#E5E5E7]">
                {allSpecKeys.map((key) => (
                  <div key={key} className="grid grid-cols-2 border-b border-[#E5E5E7] last:border-0 divide-x divide-[#E5E5E7]">
                    <div className="py-4 pr-6 flex flex-col justify-center">
                      <div className="text-xs text-slate-400 mb-1">{key}</div>
                      <div className="text-sm font-medium text-[#1D1D1F]">{items[0].specs?.[key] || '—'}</div>
                    </div>
                    <div className="py-4 pl-6 flex flex-col justify-center">
                      <div className="text-xs text-slate-400 mb-1">{key}</div>
                      <div className="text-sm font-medium text-[#1D1D1F]">{items[1].specs?.[key] || '—'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
