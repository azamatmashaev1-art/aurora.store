import { Product } from '@/store/cartStore';

export const categories = [
  "iPhone",
  "Mac",
  "iPad",
  "Watch",
  "AirPods",
  "Dyson",
  "Audio",
  "Аксессуары",
  "Гаджеты"
];

export const brands = ["Apple", "Dyson", "Sony", "Marshall", "JBL", "Garmin", "DJI", "Bose"];

export const mockProducts: Product[] = [
  {
    id: "p1",
    title: "iPhone 17 Pro Max 256GB Desert Titanium",
    description: "The ultimate iPhone. Featuring the new A19 Pro chip, revolutionary camera system with 48MP periscope telephoto, and ultra-thin titanium chassis. Pre-installed with iOS 19.",
    price: 139990,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800",
    category: "iPhone",
    brand: "Apple",
    rating: 5.0,
    stock: 45,
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800"],
    specs: {
      "Экран": "6.9\" Super Retina XDR",
      "Процессор": "Apple A19 Pro",
      "Камера": "48 МП + 12 МП + 12 МП",
      "Память": "256 ГБ",
      "Вес": "221 г"
    }
  },
  {
    id: "p2",
    title: "iPhone 17 Air 256GB Silver",
    description: "Impossibly thin. The new iPhone Air redefines what's possible with a stunning redesign, ProMotion display, and A19 chip in the thinnest profile ever.",
    price: 104990,
    image: "https://images.unsplash.com/photo-1611791484670-ce19b801d192?q=80&w=800",
    category: "iPhone",
    brand: "Apple",
    rating: 4.8,
    stock: 30,
    images: ["https://images.unsplash.com/photo-1611791484670-ce19b801d192?q=80&w=800"],
    specs: {
      "Экран": "6.55\" Super Retina XDR",
      "Процессор": "Apple A19",
      "Камера": "48 МП",
      "Память": "256 ГБ",
      "Вес": "154 г"
    }
  },
  {
    id: "p3",
    title: "MacBook Pro 14-inch M5 Pro",
    description: "Mind-blowing performance. The M5 Pro chip delivers uncharted speed. Featuring a stunning tandem OLED display and all-day battery life.",
    price: 214990,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800",
    category: "Mac",
    brand: "Apple",
    rating: 4.9,
    stock: 20,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800"],
    specs: {
      "Экран": "14.2\" Liquid Retina XDR",
      "Процессор": "Apple M5 Pro",
      "Оперативная память": "18 ГБ",
      "Накопитель": "512 ГБ SSD",
      "Вес": "1.55 кг"
    }
  },
  {
    id: "p4",
    title: "MacBook Neo",
    description: "The next generation of portable computing. Ultra-lightweight, fanless design featuring the blazing fast M5 chip.",
    price: 135990,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800",
    category: "Mac",
    brand: "Apple",
    rating: 4.7,
    stock: 15,
    images: ["https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800"],
    specs: {
      "Экран": "13.6\" Liquid Retina",
      "Процессор": "Apple M5",
      "Оперативная память": "16 ГБ",
      "Накопитель": "256 ГБ SSD",
      "Вес": "1.24 кг"
    }
  },
  {
    id: "p5",
    title: "iPad Pro 13-inch (M5)",
    description: "The ultimate iPad experience with the most advanced display, the M5 chip, and the Apple Pencil Pro. Impossibly thin.",
    price: 134990,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800",
    category: "iPad",
    brand: "Apple",
    rating: 4.9,
    stock: 25,
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800"],
    specs: {
      "Экран": "13\" Ultra Retina XDR",
      "Процессор": "Apple M5",
      "Память": "256 ГБ",
      "Толщина": "5.1 мм",
      "Вес": "579 г"
    }
  },
  {
    id: "p6",
    title: "Apple Watch Series 11",
    description: "The ultimate device for a healthy life. Now with advanced blood pressure monitoring, thinner bezels, and the S11 chip.",
    price: 45990,
    image: "https://images.unsplash.com/photo-1434493789847-210111bb9e5f?q=80&w=800",
    category: "Watch",
    brand: "Apple",
    rating: 4.8,
    stock: 50,
    images: ["https://images.unsplash.com/photo-1434493789847-210111bb9e5f?q=80&w=800"],
    specs: {
      "Корпус": "Алюминий 46 мм",
      "Экран": "Always-On Retina",
      "Влагозащита": "До 50 м",
      "Датчики": "ЭКГ, Пульсоксиметр, Давление"
    }
  },
  {
    id: "p7",
    title: "AirPods Pro (3rd generation)",
    description: "Next-level Active Noise Cancellation. Now with body temperature sensing, improved spatial audio, and USB-C.",
    price: 26990,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800",
    category: "AirPods",
    brand: "Apple",
    rating: 4.9,
    stock: 120,
    images: ["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800"],
    specs: {
      "Шумоподавление": "Активное (ANC)",
      "Время работы": "До 6 часов",
      "Разъем": "USB-C",
      "Защита": "IP54"
    }
  },
  {
    id: "p8",
    title: "Dyson Airwrap Multi-styler i.d.™",
    description: "The unparalleled multi-styler. Programmed to auto-adapt to your hair profile. Styles with no extreme heat.",
    price: 52990,
    image: "https://images.unsplash.com/photo-1620336214210-91aabee8a855?q=80&w=800",
    category: "Dyson",
    brand: "Dyson",
    rating: 4.8,
    stock: 12,
    images: ["https://images.unsplash.com/photo-1620336214210-91aabee8a855?q=80&w=800"],
    specs: {
      "Мощность": "1300 Вт",
      "Насадки": "6 штук",
      "Технологии": "Bluetooth, Мобильное приложение",
      "Вес": "610 г"
    }
  },
  {
    id: "p9",
    title: "Sony WH-1000XM6 Wireless Noise Canceling",
    description: "Industry-leading noise cancellation optimized to you. Magnificent sound engineered to perfection. Crystal clear hands-free calling.",
    price: 38990,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800",
    category: "Audio",
    brand: "Sony",
    rating: 4.7,
    stock: 85,
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800"],
    specs: {
      "Тип": "Полноразмерные",
      "Шумоподавление": "Активное (HD Noise Cancelling Dual Processor)",
      "Время работы": "До 40 часов",
      "Подключение": "Bluetooth 5.3"
    }
  },
  {
    id: "p10",
    title: "Marshall Middleton Portable Bluetooth Speaker",
    description: "Carry the heaviest portable sound in your hand. Middleton utilizes True Stereophonic, a unique form of multi-directional stereo sound.",
    price: 29990,
    image: "https://images.unsplash.com/photo-1698759570119-a1b7e61ea4d0?q=80&w=800",
    category: "Audio",
    brand: "Marshall",
    rating: 4.6,
    stock: 40,
    images: ["https://images.unsplash.com/photo-1698759570119-a1b7e61ea4d0?q=80&w=800"],
    specs: {
      "Тип": "Портативная акустика",
      "Мощность": "50 Вт",
      "Водозащита": "IP67",
      "Время работы": "До 20 часов"
    }
  },
  {
    id: "p11",
    title: "AirPods Max Синий",
    description: "Наушники Apple AirPods Max. Идеальный баланс между потрясающим звуком и магией AirPods. Полноразмерные наушники с активным шумоподавлением.",
    price: 54990,
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=800",
    category: "AirPods",
    brand: "Apple",
    rating: 4.9,
    stock: 15,
    images: ["https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=800"],
    specs: {
      "Тип": "Полноразмерные",
      "Шумоподавление": "Активное (ANC)",
      "Акустика": "Динамические драйверы Apple",
      "Материал": "Алюминий и сталь"
    }
  },
  {
    id: "p12",
    title: "iPhone 16 Pro Max 256GB Black Titanium",
    description: "Built for Apple Intelligence. A18 Pro chip. A stunning titanium design. Camera Control. 4K 120 fps Dolby Vision.",
    price: 119990,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800",
    category: "iPhone",
    brand: "Apple",
    rating: 4.9,
    stock: 60,
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800"],
    specs: {
      "Экран": "6.9\" Super Retina XDR",
      "Процессор": "Apple A18 Pro",
      "Камера": "48 МП + 48 МП + 12 МП",
      "Память": "256 ГБ",
      "Корпус": "Титан Grade 5"
    }
  }
];

export function getProducts() {
  const extendedList = [...mockProducts];
  for(let i=0; i<5; i++) {
    mockProducts.forEach(p => {
      extendedList.push({
        ...p,
        id: `${p.id}-${i}`,
        title: `${p.title} - Variant ${i}`,
      })
    })
  }
  return extendedList;
}

export const fullCatalog = getProducts();
