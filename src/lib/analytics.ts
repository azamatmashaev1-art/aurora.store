// Google Analytics 4 & Marketing Analytics Architecture

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  // 1. Google Analytics 4
  /*
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
  */

  // 2. Meta Pixel
  /*
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, params);
  }
  */
  
  console.log(`[Analytics] Tracked ${eventName}`, params);
};

export const trackPurchase = (orderId: string, value: number, items: any[]) => {
  trackEvent('purchase', {
    transaction_id: orderId,
    value: value,
    currency: 'USD',
    items: items
  });
};

export const trackAddToCart = (productId: string, value: number) => {
  trackEvent('add_to_cart', {
    items: [{ item_id: productId, price: value }]
  });
};
