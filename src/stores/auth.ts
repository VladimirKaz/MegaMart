import { atom, computed } from 'nanostores';
import type { User } from '@/types';

// 1. Начальное состояние - всегда null
export const user = atom<User | null>(null);

// Состояния интерфейса
export const isAuthOpen = atom(false);
export type AuthMode = 'login' | 'register';
export const authMode = atom<AuthMode>('login');

export const isAuthorized = computed(user, (u) => u !== null);

// 2. Читаем localStorage ТОЛЬКО на клиенте
if (typeof window !== 'undefined') {
  const savedUser = localStorage.getItem('megamart-user');
  if (savedUser) {
    try {
      user.set(JSON.parse(savedUser));
    } catch (e) {
      console.error('Failed to parse user');
    }
  }

  // Синхронизация при изменении
  user.subscribe((value) => {
    if (value) {
      localStorage.setItem('megamart-user', JSON.stringify(value));
    } else {
      localStorage.removeItem('megamart-user');
    }
  });
}

// Экшены
export function openAuth(mode: AuthMode = 'login') {
  authMode.set(mode);
  isAuthOpen.set(true);
}

export function closeAuth() {
  isAuthOpen.set(false);
}

export function login(u: User) {
  user.set(u);
  closeAuth();
}

export function logout() {
  user.set(null);
  closeAuth();
}