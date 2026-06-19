import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User, X, Globe, Bot, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/lib/i18n';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const { lang, setLang } = useLangStore();
  const { t } = useTranslation();

  const cartCount = useCartStore((state) => state.cartCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const fetchAiSuggestions = async (q: string) => {
    if (!q.trim()) {
      setAiSuggestions([]);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      if (Array.isArray(data)) setAiSuggestions(data);
    } catch (e) {
      console.error("AI Search err:", e);
    } finally {
      setIsSearching(false);
    }
  };

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAiSuggestions(searchQuery);
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col font-sans text-[#1D1D1F]">
      {/* Top Thin Bar */}
      <div className="bg-black text-white text-xs py-2 px-4 flex justify-between items-center text-center sm:text-left">
        <span className="hidden sm:inline">Delivering premium Apple products, gadgets & electronics worldwide.</span>
        <span className="sm:hidden block w-full text-center">Premium tech worldwide.</span>
        <div className="hidden sm:flex items-center space-x-4">
          <button onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')} className="flex items-center hover:text-slate-300 transition-colors">
            <Globe className="w-3 h-3 mr-1" /> {lang === 'RU' ? 'RU' : 'EN'}
          </button>
          <button className="hover:text-slate-300 transition-colors">Support</button>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E5E7] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Mobile Menu & Logo */}
          <div className="flex items-center flex-1">
            <button className="sm:hidden -ml-2 p-2" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="text-2xl font-bold tracking-tighter ml-2 sm:ml-0">
              AURORA<span className="text-[#0F62FE]">.</span>STORE
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex space-x-8 text-sm font-medium">
              <Link to="/category" className="hover:text-[#0F62FE] transition-colors">{t('catalog')}</Link>
              <Link to="/category?filter=iPhone" className="hover:text-[#0F62FE] transition-colors">iPhone</Link>
              <Link to="/category?filter=Mac" className="hover:text-[#0F62FE] transition-colors">Mac</Link>
              <Link to="/category?filter=iPad" className="hover:text-[#0F62FE] transition-colors">iPad</Link>
              <Link to="/ai-generator" className="hover:text-[#0F62FE] transition-colors flex items-center"><Bot className="w-4 h-4 mr-1"/> {t('aiGenerator')}</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-2 sm:space-x-4 flex-1">
            <div className="hidden lg:block relative w-full max-w-[240px]">
              <form onSubmit={handleSearch} className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="pl-9 pr-4 h-9 w-full rounded-full bg-[#F5F5F7] border-transparent focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-slate-300 transition-all text-sm"
                />
              </form>
              
              {/* AI Suggestions Dropdown */}
              {searchQuery.trim().length > 0 && aiSuggestions.length > 0 && (
                 <div className="absolute right-0 top-12 w-80 bg-white border border-[#E5E5E7] shadow-xl rounded-[20px] p-4 z-50">
                    <div className="flex items-center gap-2 mb-2 px-2 text-xs font-semibold text-[#86868B] uppercase tracking-wider">
                      <Bot className="w-3 h-3 text-[#0F62FE]" />
                      AI Suggestions
                    </div>
                    {isSearching ? (
                      <div className="text-sm text-[#86868B] px-2 animate-pulse">Thinking...</div>
                    ) : (
                      <ul className="space-y-1">
                        {aiSuggestions.map((s, i) => (
                          <li key={i}>
                            <button 
                              onClick={() => {
                                setSearchQuery('');
                                navigate(`/category?search=${encodeURIComponent(s)}`);
                              }}
                              className="w-full text-left px-3 py-2 text-sm text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-[12px] transition-colors flex items-center justify-between group"
                            >
                              {s}
                              <Search className="w-3 h-3 text-[#86868B] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                 </div>
              )}
            </div>

            <button className="hidden sm:block p-2 hover:bg-slate-100 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </button>
            <Link to="/wishlist" className="p-2 hover:bg-slate-100 rounded-full transition-colors relative hidden sm:block">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#0F62FE] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#0F62FE] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white sm:hidden flex flex-col">
          <div className="flex items-center justify-between p-4 h-20 border-b border-[#E5E5E7] shrink-0">
            <span className="text-2xl font-bold tracking-tighter">
              AURORA<span className="text-[#0F62FE]">.</span>STORE
            </span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4 border-b border-[#E5E5E7] shrink-0 bg-[#F5F5F7]">
            <form onSubmit={(e) => { handleSearch(e); setIsMobileMenuOpen(false); }} className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="pl-9 pr-4 h-10 w-full rounded-full bg-white border-transparent focus-visible:bg-white text-base"
              />
            </form>
          </div>
          <nav className="flex flex-col p-4 text-base font-medium overflow-y-auto">
             <div className="py-4 border-b border-[#E5E5E7] flex items-center justify-between">
               <span className="flex items-center gap-2"><Globe className="w-5 h-5"/> {t('language')}</span>
               <div className="flex gap-2">
                 <button onClick={() => setLang('RU')} className={`px-3 py-1 rounded-full text-sm ${lang === 'RU' ? 'bg-black text-white' : 'bg-slate-100 text-slate-500'}`}>RU</button>
                 <button onClick={() => setLang('EN')} className={`px-3 py-1 rounded-full text-sm ${lang === 'EN' ? 'bg-black text-white' : 'bg-slate-100 text-slate-500'}`}>EN</button>
               </div>
             </div>
             <Link to="/wishlist" className="py-4 border-b border-[#E5E5E7] hover:text-[#0F62FE] flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
               {t('wishlist')}
               {wishlistCount > 0 && <span className="bg-[#0F62FE] text-white text-xs px-2 py-1 rounded-full">{wishlistCount}</span>}
             </Link>
             <Link to="/ai-generator" className="py-4 border-b border-[#E5E5E7] hover:text-[#0F62FE] flex items-center" onClick={() => setIsMobileMenuOpen(false)}><Bot className="w-5 h-5 mr-3"/> {t('aiGenerator')}</Link>
             <Link to="/category" className="py-4 border-b border-[#E5E5E7] hover:text-[#0F62FE]" onClick={() => setIsMobileMenuOpen(false)}>{t('catalog')}</Link>
             <Link to="/category?filter=iPhone" className="py-4 border-b border-[#E5E5E7] hover:text-[#0F62FE]" onClick={() => setIsMobileMenuOpen(false)}>iPhone</Link>
             <Link to="/category?filter=Mac" className="py-4 border-b border-[#E5E5E7] hover:text-[#0F62FE]" onClick={() => setIsMobileMenuOpen(false)}>Mac</Link>
             <Link to="/category?filter=iPad" className="py-4 border-b border-[#E5E5E7] hover:text-[#0F62FE]" onClick={() => setIsMobileMenuOpen(false)}>iPad</Link>
             <Link to="/category?filter=Watch" className="py-4 border-b border-[#E5E5E7] hover:text-[#0F62FE]" onClick={() => setIsMobileMenuOpen(false)}>Watch</Link>
             <Link to="/category?filter=AirPods" className="py-4 border-b border-[#E5E5E7] hover:text-[#0F62FE]" onClick={() => setIsMobileMenuOpen(false)}>AirPods</Link>
             <Link to="/category?filter=Dyson" className="py-4 hover:text-[#0F62FE]" onClick={() => setIsMobileMenuOpen(false)}>Dyson</Link>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black pt-20 pb-10 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
           <div>
             <h3 className="text-white text-lg font-bold tracking-tight mb-4">AURORA.STORE</h3>
             <p className="text-sm leading-relaxed mb-6">Redefining online retail with a curated selection of premium electronics, gadgets and tech accessories.</p>
           </div>
           <div>
             <h4 className="text-white font-medium mb-4">Shop</h4>
             <ul className="space-y-2 text-sm">
               <li><Link to="/category" className="hover:text-white transition-colors">All Products</Link></li>
               <li><Link to="/category?filter=Apple" className="hover:text-white transition-colors">Apple Devices</Link></li>
               <li><Link to="/category?filter=Audio" className="hover:text-white transition-colors">Headphones & Audio</Link></li>
             </ul>
           </div>
           <div>
             <h4 className="text-white font-medium mb-4">Support</h4>
             <ul className="space-y-2 text-sm">
               <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
               <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
             </ul>
           </div>
           <div>
             <h4 className="text-white font-medium mb-4">Newsletter</h4>
             <p className="text-sm mb-4">Subscribe for early access to new product drops.</p>
             <div className="flex max-w-sm">
               <Input className="bg-white/5 border-transparent text-white placeholder-slate-500 rounded-r-none focus-visible:ring-1 focus-visible:ring-white" placeholder="Email address" />
               <Button className="rounded-l-none bg-white text-black hover:bg-slate-200">Submit</Button>
             </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center pt-8 text-xs">
          <p>&copy; {new Date().getFullYear()} Aurora Store. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
