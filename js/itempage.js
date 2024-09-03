document.querySelectorAll('.carousel-img').forEach(img => {
  img.addEventListener('click', function () {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = this.src;
  });
});

const carousel = document.querySelector('.carousel');
const btnUp = document.getElementById('carouselUp');
const btnDown = document.getElementById('carouselDown');


btnUp.addEventListener('click', () => {
  carousel.scrollBy({ top: -80, behavior: 'smooth' });
});

btnDown.addEventListener('click', () => {
  carousel.scrollBy({ top: 80, behavior: 'smooth' });
});
