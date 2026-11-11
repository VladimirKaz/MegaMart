<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { ref, watch } from 'vue';
import { isAuthOpen, authMode, login, closeAuth } from '@/stores/auth';
import type { AuthMode } from '@/stores/auth';

const open = useStore(isAuthOpen);
const mode = useStore(authMode);

const email = ref('');
const password = ref('');
const name = ref('');
const error = ref('');

// Сбрасываем форму при открытии
watch(open, (v) => {
  if (v) {
    email.value = '';
    password.value = '';
    name.value = '';
    error.value = '';
  }
});

function setMode(m: AuthMode) {
  authMode.set(m);
  error.value = '';
}

function submit() {
  error.value = '';
  if (!email.value || !password.value) {
    error.value = 'Заполните все поля';
    return;
  }

  // TODO: Заменить на реальный API
  login({
    id: crypto.randomUUID(),
    email: email.value,
    name: name.value || email.value.split('@')[0],
  });
}

function close() {
  closeAuth();
}
</script>

<template>
  <Teleport to="body">
    <!-- Без Transition! Только v-if -->
    <div v-if="open" class="auth-modal" @click.self="closeAuth">
      <div class="auth-modal__panel" role="dialog" aria-modal="true">
        <button class="auth-modal__close" @click="closeAuth" aria-label="Закрыть">×</button>

        <div class="auth-modal__tabs">
          <button :class="['auth-modal__tab', { active: mode === 'login' }]" @click="setMode('login')">
            Вход
          </button>
          <button :class="['auth-modal__tab', { active: mode === 'register' }]" @click="setMode('register')">
            Регистрация
          </button>
        </div>

        <form class="auth-modal__form" @submit.prevent="submit">
          <label v-if="mode === 'register'">
            <span>Имя</span>
            <input v-model="name" type="text" placeholder="Как к вам обращаться?" />
          </label>

          <label>
            <span>Email</span>
            <input v-model="email" type="email" placeholder="you@example.com" />
          </label>

          <label>
            <span>Пароль</span>
            <input v-model="password" type="password" placeholder="••••••••" />
          </label>

          <p v-if="error" class="auth-modal__error">{{ error }}</p>

          <button type="submit" class="auth-modal__submit">
            {{ mode === 'login' ? 'Войти' : 'Зарегистрироваться' }}
          </button>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.auth-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 16px;
  
  /* Анимация вместо Transition */
  animation: fadeIn 0.2s ease-out;
}

.auth-modal__close {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 28px;
  line-height: 1;
  color: var(--color-text-secondary, #888);
  background: none;
  border: none;
  cursor: pointer;
}

.auth-modal__tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.auth-modal__tab {
  flex: 1;
  padding: 10px;
  font-weight: 700;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-text-secondary, #888);
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.auth-modal__tab.active {
  color: var(--color-primary, #f16d4f);
  border-bottom-color: var(--color-primary, #f16d4f);
}

.auth-modal__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-modal__form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
}

.auth-modal__form input {
  height: 44px;
  padding: 0 14px;
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.auth-modal__form input:focus {
  border-color: var(--color-primary, #f16d4f);
}

.auth-modal__error {
  color: #e53935;
  font-size: 13px;
  margin: 0;
}

.auth-modal__submit {
  height: 48px;
  border: none;
  border-radius: 10px;
  background: var(--color-primary, #f16d4f);
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.auth-modal__submit:hover {
  opacity: 0.9;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.auth-modal__panel {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: var(--color-white, #fff);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.2s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>