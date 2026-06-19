import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Star, Filter, X, ChevronDown, Heart, Scale, Eye } from 'lucide-react';
import { fullCatalog, categories, brands, getProducts } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCompareStore } from '@/store/compareStore';
import { QuickViewModal } from '@/components/QuickViewModal';
import { Product } from '@/store/cartStore';
import { useTranslation, formatPrice } from '@/lib/i18n';

export default function Category() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search')?.toLowerCase() || '';
  const filterCat = searchParams.get('filter') || '';
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>(filterCat ? [filterCat] : []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sort, setSort] = useState('popular');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const { isInCompare, addItem: addToCompare, removeItem: removeFromCompare, items: compareItems } = useCompareStore();
  const { t, lang } = useTranslation();
  
  const toggleCat = (c: string) => {
    setSelectedCats(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };
  
  const toggleBrand = (b: string) => {
    setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);
  };

  const filteredProducts = useMemo(() => {
    let result = fullCatalog;
    
    if (search) {
      result = result.filter(p => p.title.toLowerCase().includes(search) || p.description.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search) || p.category.toLowerCase().includes(search));
    }
    
    if (selectedCats.length > 0) {
      // Partial match for categories since our links might only pass "Household"
      result = result.filter(p => selectedCats.some(c => p.category.toLowerCase().includes(c.toLowerCase())));
    }
    
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (minPrice) {
      result = result.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }
    
    switch (sort) {
      case 'price-low': result.sort((a,b) => a.price - b.price); break;
      case 'price-high': result.sort((a,b) => b.price - a.price); break;
      case 'rating': result.sort((a,b) => b.rating - a.rating); break;
      // 'popular' keeps default array order
    }
    
    return result;
  }, [search, selectedCats, selectedBrands, sort, minPrice, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {search ? `Search Results for "${search}"` : t('shopCategory')}
          </h1>
          <p className="text-slate-500 mt-1">{filteredProducts.length} items found</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Mobile Filter Button */}
          <Button variant="outline" className="lg:hidden" onClick={() => setIsMobileFiltersOpen(true)}>
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
          
          {/* Sort Dropdown simulated */}
          <div className="relative">
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white border border-[#E5E5E7] rounded-[12px] py-2 pl-4 pr-10 hover:bg-[#F5F5F7] focus:outline-none focus:ring-2 focus:ring-[#0F62FE]"
            >
               <option value="popular">{t('popular')}</option>
               <option value="new">{t('newest')}</option>
               <option value="price-low">{t('priceLowToHigh')}</option>
               <option value="price-high">{t('priceHighToLow')}</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 pointer-events-none text-slate-500" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar */}
        <div className={`fixed inset-0 z-50 bg-white lg:static lg:bg-transparent lg:w-64 lg:block lg:z-auto transition-transform duration-300 ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="h-full overflow-y-auto p-4 lg:p-0">
            <div className="flex justify-between items-center lg:hidden mb-6">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)}><X className="w-5 h-5"/></button>
            </div>
            
            <div className="space-y-8">
               <div>
                 <h3 className="font-semibold text-slate-900 mb-4">{t('priceRange')}</h3>
                 <div className="flex items-center gap-2">
                   <input type="number" placeholder={t('min')} value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full px-3 py-2 border border-[#E5E5E7] rounded-lg text-sm" />
                   <span className="text-slate-400">-</span>
                   <input type="number" placeholder={t('max')} value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full px-3 py-2 border border-[#E5E5E7] rounded-lg text-sm" />
                 </div>
               </div>

               <div>
                  <h3 className="font-semibold text-slate-900 mb-4">{t('categories')}</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {categories.map(c => (
                      <label key={c} className="flex items-center space-x-3 cursor-pointer group">
                        <input type="checkbox" checked={selectedCats.includes(c)} onChange={() => toggleCat(c)} className="w-4 h-4 rounded border-slate-300 text-[#0F62FE] focus:ring-[#0F62FE]" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{c}</span>
                      </label>
                    ))}
                  </div>
               </div>
               
               <div>
                  <h3 className="font-semibold text-slate-900 mb-4">{t('brands')}</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {brands.map(b => (
                      <label key={b} className="flex items-center space-x-3 cursor-pointer group">
                        <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} className="w-4 h-4 rounded border-slate-300 text-[#0F62FE] focus:ring-[#0F62FE]" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{b}</span>
                      </label>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Filters Overlay */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileFiltersOpen(false)} />
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[24px] border border-[#E5E5E7]">
               <h3 className="text-[18px] font-semibold text-[#1D1D1F] mb-2">{t('noProductsFound')}</h3>
               <p className="text-[#86868B]">Try adjusting your filters or search terms.</p>
               <Button onClick={() => { setSelectedCats([]); setSelectedBrands([]); setMinPrice(''); setMaxPrice(''); }} className="mt-6 bg-[#0F62FE] text-white hover:bg-[#0F62FE]/90 rounded-full">{t('clearFilters')}</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product, i) => (
                <div key={product.id} className="group relative flex flex-col">
                  <Link to={`/product/${product.id}`} className="hover:opacity-80 transition-opacity">
                    <div className="bg-[#F5F5F7] h-[200px] sm:h-[240px] rounded-[24px] mb-3 relative flex items-center justify-center overflow-hidden shrink-0 p-6">
                      <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
                      {i < 3 && (
                        <div className="absolute top-4 left-4 bg-black text-white text-[11px] px-2 py-1 rounded-[6px] font-semibold tracking-widest">NEW</div>
                      )}
                    </div>
                  </Link>
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        if (isInWishlist(product.id)) {
                          removeFromWishlist(product.id);
                        } else {
                          addToWishlist(product);
                        }
                      }}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-slate-50 transition-colors"
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
                      className="bg-white p-2 rounded-full shadow-md hover:bg-slate-50 transition-colors"
                    >
                      <Scale className={`w-4 h-4 ${isInCompare(product.id) ? 'text-[#0F62FE]' : 'text-slate-400'}`} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setQuickViewProduct(product);
                      }}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-slate-50 transition-colors"
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
          )}
        </div>
      </div>
      
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}
