import { atom, map, onSet } from 'nanostores';
import type { Product } from '@/types';

// Local storage
const savedCart = typeof window !== 'undefined' ? localStorage.getItem('megamart-cart') : null;

const initialData = savedCart ? JSON.parse(savedCart) : {};

// Состояние корзины (объект, где ключ — это ID товара)
export const cartItems = map<Record<string, Product & { quantity: number }>>(initialData);

// Состояние для открытия/закрытия панели
export const isCartOpen = atom(false);

// 4. Слушаем любые изменения в сторе и сохраняем в localStorage
onSet(cartItems, ({ newValue }) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('megamart-cart', JSON.stringify(newValue));
  }
});

// Хелпер для добавления
export function addToCart(product: Product) {
  const existing = cartItems.get()[product.id];
  if (existing) {
    cartItems.setKey(product.id, { ...existing, quantity: existing.quantity + 1 });
  } else {
    cartItems.setKey(product.id, { ...product, quantity: 1 });
  }
}

// Хелпер для удаления
export function removeFromCart(productId: string) {
  const newItems = { ...cartItems.get() };
  delete newItems[productId];
  cartItems.set(newItems);
}

// Логика управления количеством товара внутри корзины
export function decrementQuantity(productId: string) {
  const existing = cartItems.get()[productId];
  if (existing) {
    if (existing.quantity > 1) {
      cartItems.setKey(productId, { ...existing, quantity: existing.quantity - 1 });
    } else {
      const newItems = { ...cartItems.get() };
      delete newItems[productId];
      cartItems.set(newItems);
    }
  }
}