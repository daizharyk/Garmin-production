function initCarouselAndVideo() {
  // Горизонтальная и вертикальная карусели
  const carouselHorizontal = document.querySelector('.carousel1');
  const carouselItemsHorizontal = Array.from(carouselHorizontal.children);
  const carouselLeft = document.getElementById('carouselLeft1');
  const carouselRight = document.getElementById('carouselRight1');

  const carouselVertical = document.querySelector('.carousel');
  const carouselItemsVertical = Array.from(carouselVertical.children);

  let currentIndex = 0;

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

  // Добавление поддержки свайпов
  let touchStartX = 0;
  let touchEndX = 0;

  const handleSwipe = () => {
    const swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > 50) { // Свайп влево
      moveToNext();
    } else if (swipeDistance < -50) { // Свайп вправо
      moveToPrevious();
    }
  };

  carouselHorizontal.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  });

  carouselHorizontal.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  });

  // Видео плеер
  const playButton = document.querySelector('.play-button');
  const videoThumbnail = document.querySelector('.video-thumbnail');
  const videoPlayer = document.getElementById('video-player');

  playButton.addEventListener('click', function () {
    // Скрыть миниатюру и кнопку воспроизведения
    videoThumbnail.style.display = 'none';

    // Показать видео и воспроизвести его
    videoPlayer.style.display = 'block';
    videoPlayer.src += "&autoplay=1"; // Используйте ? вместо & при добавлении параметра к начальному URL
  });

  // Вертикальная карусель с кнопками вверх/вниз
  const carousel = document.querySelector('.carousel');
  const upButton = document.getElementById('carouselUp');
  const downButton = document.getElementById('carouselDown');

  // Функция для обновления состояния кнопок
  function updateButtonState() {
    // Если прокрутка в самом начале, отключить кнопку вверх
    if (carousel.scrollTop <= 0) {
      upButton.disabled = true;
    } else {
      upButton.disabled = false;
    }
    
    // Если прокрутка достигла конца, отключить кнопку вниз
    if (carousel.scrollTop + carousel.clientHeight >= carousel.scrollHeight) {
      downButton.disabled = true;
    } else {
      downButton.disabled = false;
    }
  }

  // Прокрутка вверх
  upButton.addEventListener('click', () => {
    carousel.scrollBy({
      top: -80, 
      behavior: 'smooth'
    });
    setTimeout(updateButtonState, 500); // Обновить состояние кнопок после прокрутки
  });

  // Прокрутка вниз
  downButton.addEventListener('click', () => {
    carousel.scrollBy({
      top: 80, 
      behavior: 'smooth'
    });
    setTimeout(updateButtonState, 500); // Обновить состояние кнопок после прокрутки
  });

  // Проверить начальное состояние кнопок
  updateButtonState();
}