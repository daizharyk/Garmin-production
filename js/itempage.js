document.addEventListener('DOMContentLoaded', () => {
  const carouselHorizontal = document.querySelector('.carousel1');
  const carouselItemsHorizontal = Array.from(carouselHorizontal.children);
  const carouselLeft = document.getElementById('carouselLeft1');
  const carouselRight = document.getElementById('carouselRight1');

  const carouselVertical = document.querySelector('.carousel');
  const carouselItemsVertical = Array.from(carouselVertical.children);

  let currentIndex = 0;
  
  document.getElementById('carouselUp').addEventListener('click', () => {
    document.querySelector('.carousel').scrollBy({
      top: -80, 
      behavior: 'smooth'
    });
  });
  
  document.getElementById('carouselDown').addEventListener('click', () => {
    document.querySelector('.carousel').scrollBy({
      top:80, 
      behavior: 'smooth'
    });
  });

  const updateCarousel = () => {
    // Обновление горизонтального каруселя
    const offset = -currentIndex * 100; // 100% ширины одного элемента
    carouselHorizontal.style.transform = `translateX(${offset}%)`;
    
    // Обновление видимости кнопок горизонтального каруселя
    carouselLeft.style.display = currentIndex === 0 ? 'none' : 'flex';
    carouselRight.style.display = currentIndex === carouselItemsHorizontal.length - 1 ? 'none' : 'flex';

    // Обновление вертикального каруселя
    const verticalOffset = currentIndex * 80; // Высота элемента в пикселях
    carouselVertical.scrollTo({
      top: verticalOffset,
      behavior: 'smooth'
    });

    // Обновление обводки выбранного изображения
    carouselItemsVertical.forEach((img, index) => {
      if (index === currentIndex) {
        img.classList.add('selected');
      } else {
        img.classList.remove('selected');
      }
    });
  };

  const moveToNext = () => {
    if (currentIndex < carouselItemsHorizontal.length - 1) {
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

  // Устанавливаем начальное состояние
  updateCarousel();

  // Синхронизация вертикального каруселя с горизонтальным
  document.querySelectorAll('.carousel-img').forEach((img, index) => {
    img.addEventListener('click', function () {
      currentIndex = index;
      updateCarousel();
    });
  });
});