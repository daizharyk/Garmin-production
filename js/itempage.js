document.addEventListener('DOMContentLoaded', () => {
  // Этот код выполняется после полной загрузки DOM
  const params = new URLSearchParams(location.search);
  const itemId = params.get("id");
  console.log("item id:", itemId);
  // Загружаем данные из JSON
  fetch('../data/item.json')
    .then(response => response.json())
    .then(data => {
      const item = data.items.find(item => item.id == itemId);

      document.querySelector('.product-title').textContent = item.name;
        document.querySelector('.product-color').textContent = item.color;
        document.getElementById('sale-box').textContent = item.status;
        document.getElementById('product-price').textContent = item.price.toFixed(2);
      const carousel = document.querySelector('.carousel');
      item.carousel_images.forEach(imgSrc => {
        const div = document.createElement('div');
        div.classList.add('carousel-box');
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = item.name;
        img.classList.add('carousel-img');
        div.appendChild(img);
        carousel.appendChild(div);

        const carousel1 = document.querySelector('.carousel1');
          item.carousel_images.forEach(imgSrc => {
            const div = document.createElement('div');
            div.classList.add('carousel-box1');
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = item.name;
            img.classList.add('carousel-img1');
            div.appendChild(img);
            carousel1.appendChild(div);
          });
      });

      document.querySelector(".disc-right").textContent = item.banner_text.text;
      document.getElementById("bannerwithtext").src = item.banner_text.banner_images.main_banner;
      document.getElementById("bannerwithtext").alt = item.banner_text.banner_images.alt;
      document.getElementById("bannerwithtext-adaptive").src = item.banner_text.banner_images.adaptive_banner;
      document.getElementById("bannerwithtext-adaptive").alt = item.banner_text.banner_images.alt;
      
      const videoThumbnail = document.querySelector(".video-thumbnail");
      videoThumbnail.querySelector('img').src = item.video_section.thumbnail;
      document.querySelector(".thumbnail-img").alt = item.video_section.thumbnail;
      document.getElementById("video-player").src = item.video_section.video_url;
      
      document.querySelector('.walpapperinfo').src = item.additional_images.main_image;
      document.querySelector('.walpapperinfo').alt = item.banner_text.banner_images.alt;

      document.querySelector('.walpapperinfo-adaptive').src = item.additional_images.adaptive_image;
      document.querySelector('.walpapperinfo-adaptive').alt = item.banner_text.banner_images.alt;

      const functionInfoContainer = document.querySelector('.cards-container');
      item.watch_features.forEach(feature => {
        const card = document.createElement('div');
        card.classList.add('function-info-card');
        const img = document.createElement('img');
        img.src = feature.image;
        img.alt = feature.title;
        const title = document.createElement('h2');
        title.textContent = feature.title;
        const description = document.createElement('p');
        description.textContent = feature.description;
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(description);
        functionInfoContainer.appendChild(card);
      });
      
      // После добавления всех элементов в DOM, запускаем инициализацию карусели

      initCarousel(); // Здесь вызываем нашу функцию
      
    })
    .catch(error => console.error('Error loading data:', error));
});
        

function initCarousel() {
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




  const playButton = document.querySelector('.play-button');
  const videoThumbnail = document.querySelector('.video-thumbnail');
  const videoPlayer = document.getElementById('video-player');

  playButton.addEventListener('click', function() {
    // Скрыть миниатюру и кнопку воспроизведения
    videoThumbnail.style.display = 'none';

    // Показать видео и воспроизвести его
    videoPlayer.style.display = 'block';
    videoPlayer.src += "&autoplay=1"; // Используйте ? вместо & при добавлении параметра к начальному URL
  });




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



}


const navBar = document.querySelector('.nav-bar');

const navBarOffsetTop = navBar.offsetTop;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;


  if (currentScroll >= navBarOffsetTop) {
    navBar.classList.add('sticky');
  } else {
    navBar.classList.remove('sticky');
  }
});