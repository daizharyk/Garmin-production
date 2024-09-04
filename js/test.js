document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel1');
  const carouselItems = Array.from(carousel.children);
  const carouselLeft = document.getElementById('carouselLeft1');
  const carouselRight = document.getElementById('carouselRight1');
  let currentIndex = 0;

  const updateCarousel = () => {
    const offset = -currentIndex * 100; // Сдвиг карусели в зависимости от текущего индекса
    carousel.style.transform = `translateX(${offset}%)`;

    // Управление видимостью кнопок
    carouselLeft.style.display = currentIndex === 0 ? 'none' : 'flex';
    carouselRight.style.display = currentIndex === carouselItems.length - 1 ? 'none' : 'flex';
  };

  const moveToNext = () => {
    if (currentIndex < carouselItems.length - 1) {
      currentIndex += 1;
      updateCarousel();
    }
  };

  const moveToPrevious = () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
    }
  };

  carouselLeft.addEventListener('click', moveToPrevious);
  carouselRight.addEventListener('click', moveToNext);

  updateCarousel(); // Инициализируем карусель
});