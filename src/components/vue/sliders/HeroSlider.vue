<!-- src/components/ui/HeroSlider.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue';

interface Slide {
  id: number | string;
  kicker: string;
  title: string;
  subtitle: string;
  image: string; // В компонент приходит уже строка (src)
  alt: string;
}

const props = defineProps<{
  slides: Slide[];
  decoration: string;
}>();

const currentIndex = ref(0);

// Текущий слайд для удобства
const currentSlide = computed(() => props.slides[currentIndex.value]);

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length;
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.slides.length) % props.slides.length;
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};
</script>

<template>
  <div class="hero__banner">
    <!-- 1. ФОН (Декор) -->
    <!-- Он лежит отдельно и не участвует в анимациях переключения -->
    <img :src="decoration" alt="Decoration" class="hero__decoration" />

    <!-- 2. ЛЕВАЯ ЧАСТЬ: Текст -->
    <div class="hero__content">
      <div class="hero__content-inner">
        <Transition name="fade" mode="out-in">
          <!-- key нужен, чтобы Vue понял, что контент изменился -->
          <div :key="currentSlide.id" class="hero__text-block">
            <p class="hero__kicker">{{ currentSlide.kicker }}</p>
            <h1 class="hero__title">{{ currentSlide.title }}</h1>
            <p class="hero__subtitle">{{ currentSlide.subtitle }}</p>
          </div>
        </Transition>
      </div>

      <!-- Точки (Dots) -->
      <div class="hero__dots">
        <span
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="hero__dot"
          :class="{ 'is-active': index === currentIndex }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>

    <!-- 3. ПРАВАЯ ЧАСТЬ: Картинка товара -->
    <div class="hero__media">
      <div class="hero__watch-wrapper">
        <Transition name="slide-fade" mode="out-in">
          <img
            :key="currentSlide.id"
            :src="currentSlide.image"
            :alt="currentSlide.alt"
            class="hero__watch-image"
          />
        </Transition>
      </div>
    </div>

    <!-- 4. СТРЕЛКИ -->
    <div class="hero__controls">
      <button
        class="slider-btn hero__arrow--prev"
        @click="prevSlide"
        aria-label="Предыдущий слайд"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button
        class="slider-btn hero__arrow--next"
        @click="nextSlide"
        aria-label="Следующий слайд"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* --- БАЗОВЫЕ СТИЛИ БАННЕРА --- */
.hero__banner {
  position: relative;
  height: 316px;
  background: #212842;
  border-radius: 12px; /* Скругление как на скрине */
  /* overflow: hidden; */
  display: grid;
  grid-template-columns: 60% 40%;
  isolation: isolate; /* Чтобы z-index работал корректно */
}

/* --- ДЕКОР (КРУГИ) --- */
.hero__decoration {
  position: absolute;
  top: 0;
  right: 0; /* Круги обычно справа */
  height: 100%;
  width: auto;
  z-index: 1;
  pointer-events: none; /* Чтобы не мешали кликам */

  border-top-right-radius: 12px;
}

/* --- ЛЕВАЯ ЧАСТЬ (ТЕКСТ) --- */
.hero__content {
  position: relative;
  z-index: 3;
  padding: 40px 0 40px 90px;
  color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Разносим текст и точки */
}

.hero__text-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: auto; /* Прижимаем к центру по вертикали */
  margin-bottom: auto;
}

.hero__kicker {
  font-size: 24px; /* Чуть уменьшил для баланса */
  font-weight: 500;
  line-height: 1.2;
  opacity: 0.9;
}

.hero__title {
  font-size: 56px; /* Подогнал под скрин */
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero__subtitle {
  font-size: 24px;
  font-weight: 600;
  line-height: 1;
  color: #e0e0e0;
}

/* --- ТОЧКИ --- */
.hero__dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.hero__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  opacity: 0.3;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero__dot.is-active {
  width: 24px;
  border-radius: 4px;
  opacity: 1;
}

/* --- ПРАВАЯ ЧАСТЬ (КАРТИНКА) --- */
.hero__media {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero__watch-wrapper {
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__watch-image {
  width: 100%;
  height: 100%;
  object-fit: contain;

}

/* --- СТРЕЛКИ --- */
.hero__controls {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

.slider-btn {
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  
  /* Делаем их больше (как на макете) */
  width: 86px; 
  height: 86px;
  
  border-radius: 50%;
  border: none;
  background: #fff; /* Чистый белый, как на макете */
  color: #212842;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); /* Легкая тень */
}

.slider-btn:hover {
  background: #fff;
  transform: translateY(-50%) scale(1.1);
}

.hero__arrow--prev {
  left: -45px; /* Сдвинул внутрь, чтобы не вылезали за баннер */
}

.hero__arrow--next {
  right:-45px;
}

.slider-btn svg {
  width: 24px;
  height: 24px;
  stroke-width: 2.5; /* Сделаем линии чуть жирнее */
}

/* --- АНИМАЦИИ --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}
.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

/* --- АДАПТИВ --- */
@media (max-width: 1024px) {
  .hero__title {
    font-size: 42px;
  }
  .hero__kicker,
  .hero__subtitle {
    font-size: 20px;
  }
  .hero__content {
    padding-left: 60px;
  }
  .hero__watch-wrapper {
    width: 220px;
    height: 220px;
  }
}

@media (max-width: 768px) {
  .hero__banner {
    grid-template-columns: 1fr;
    height: auto;
    padding-bottom: 20px;
  }
  .hero__content {
    padding: 30px 20px;
    text-align: center;
    align-items: center;
  }
  .hero__text-block {
    margin-bottom: 20px;
  }
  .hero__media {
    order: -1; /* Картинка сверху на мобильных */
    height: 200px;
  }
  .hero__watch-image {
    width: 70%;
  }
  .slider-btn {
    width: 46px;
    height: 46px;
  }
  .hero__decoration {
    opacity: 0; /* Приглушаем круги на мобильных */
  }
  .hero__arrow--prev {
    left: 10px;
  }
  .hero__arrow--next {
    right: 10px;
  }
}
</style>