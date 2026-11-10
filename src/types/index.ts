// cart
export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// login screen
export interface User {
  id: string;
  name: string;
  email: string;
}

// Состояние модалки (какое окно открыто)
export type AuthModalMode = 'login' | 'register' | null;