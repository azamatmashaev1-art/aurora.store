import { useLangStore } from '../store/langStore';

export const translations = {
  RU: {
    searchPlaceholder: 'Поиск товаров...',
    language: 'Язык / Language',
    wishlist: 'Избранное',
    catalog: 'Каталог',
    aiGenerator: 'ИИ Генератор',
    cart: 'Корзина',
    cartEmpty: 'Корзина пуста',
    continueShopping: 'Продолжить покупки',
    checkout: 'Оформить заказ',
    addToCart: 'В корзину',
    inStock: 'В наличии',
    outOfStock: 'Нет в наличии',
    price: 'Цена',
    total: 'Итого',
    compare: 'Сравнить',
    compareMax: 'Можно сравнить только 2 устройства одновременно',
    compareEmpty: 'Сравнение пусто',
    compareDevices: 'Сравнение устройств',
    compareCancel: 'Отменить сравнение',
    compareSelectSecond: 'Выберите второе устройство для сравнения',
    reviews: 'Отзывы о товаре',
    writeReview: 'Написать отзыв',
    share: 'Поделиться',
    productDescription: 'Описание продукта',
    popular: 'Популярные',
    newest: 'Новинки',
    priceLowToHigh: 'Сначала дешевые',
    priceHighToLow: 'Сначала дорогие',
    categories: 'Категории',
    brands: 'Бренды',
    priceRange: 'Диапазон цен',
    min: 'Мин',
    max: 'Макс',
    clearFilters: 'Сбросить фильтры',
    noProductsFound: 'Товары не найдены',
    bestSellers: 'Хиты продаж',
    viewAll: 'Смотреть все',
    shopCategory: 'Все категории',
    bannerTitle: 'Новинки от Apple',
    bannerSubtitle: 'Прикоснись к будущему уже сегодня. Титановый iPhone 17 Pro и новая эра гаджетов.',
    bannerButton: 'Купить сейчас',
    orderHistory: 'История покупок',
    profile: 'Профиль',
    login: 'Войти',
    welcome: 'Добро пожаловать',
  },
  EN: {
    searchPlaceholder: 'Search products...',
    language: 'Language / Язык',
    wishlist: 'Wishlist',
    catalog: 'Catalog',
    aiGenerator: 'AI Generator',
    cart: 'Cart',
    cartEmpty: 'Your cart is empty',
    continueShopping: 'Continue Shopping',
    checkout: 'Checkout',
    addToCart: 'Add to Cart',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    price: 'Price',
    total: 'Total',
    compare: 'Compare',
    compareMax: 'You can only compare 2 devices at a time',
    compareEmpty: 'Comparison is empty',
    compareDevices: 'Compare Devices',
    compareCancel: 'Cancel comparison',
    compareSelectSecond: 'Select a second device to compare',
    reviews: 'Customer Reviews',
    writeReview: 'Write a Review',
    share: 'Share',
    productDescription: 'Product Description',
    popular: 'Popular',
    newest: 'Newest',
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    categories: 'Categories',
    brands: 'Brands',
    priceRange: 'Price Range',
    min: 'Min',
    max: 'Max',
    clearFilters: 'Clear Filters',
    noProductsFound: 'No products found',
    bestSellers: 'Best Sellers',
    viewAll: 'View All',
    shopCategory: 'Shop by Category',
    bannerTitle: 'New from Apple',
    bannerSubtitle: 'Touch the future today. The titanium iPhone 17 Pro and a new era of devices.',
    bannerButton: 'Shop Now',
    orderHistory: 'Order History',
    profile: 'Profile',
    login: 'Login',
    welcome: 'Welcome',
  }
} as const;

export type TranslationKey = keyof typeof translations.RU;

export function useTranslation() {
  const lang = useLangStore((state) => state.lang);
  
  const t = (key: TranslationKey): string => {
    return translations[lang][key] || key;
  };

  return { t, lang };
}

export function formatPrice(priceInSom: number, lang: 'RU' | 'EN'): string {
  if (lang === 'EN') {
    // Let's assume 1 USD = 85 SOM
    const priceInDollar = priceInSom / 85;
    return `$${priceInDollar.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${priceInSom.toLocaleString('ru-RU')} сом`;
}
