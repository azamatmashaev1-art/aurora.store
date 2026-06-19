import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AiChatbot from './components/AiChatbot';
import { CompareModal } from './components/CompareModal';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/Category'));
const ProductInfo = lazy(() => import('./pages/ProductInfo'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const AiGenerator = lazy(() => import('./pages/AiGenerator'));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="flex h-[50vh] items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-black animate-spin" /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/ai-generator" element={<AiGenerator />} />
        </Routes>
      </Suspense>
      <AiChatbot />
      <CompareModal />
    </Layout>
  );
}

