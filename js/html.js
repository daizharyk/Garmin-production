



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

// Функция для создания карточек
 export function creatCards(data) {
  const container = document.getElementById('cards-container')

  data.items.forEach(item => {
    // Создание карточки
    const card = document.createElement('div');
    card.classList.add('item-card');

    const cardImg = document.createElement('div');
    cardImg.classList.add('item-card-img');
    const img = document.createElement('img');
    img.src = `img/smartwatches/${item.image}`;
    img.alt = item.name;
    cardImg.appendChild(img);

    const cardDesc = document.createElement('figcaption');
    cardDesc.classList.add('product-card-description');
    const title = document.createElement('h2');
    title.innerHTML = `${item.name}<span class="trademark">®</span>`;
    const description =document.createElement('p');
    description.classList.add('product-description');
    description.textContent =item.text;
    const price = document.createElement('p');
    price.classList.add('price-text');
    price.textContent = `$${item.price.toFixed(2)} USD`
    
    cardDesc.appendChild(title);
    cardDesc.appendChild(description);
    cardDesc.appendChild(price);


    card.appendChild(cardImg);
    card.appendChild(cardDesc);

    container.appendChild(card);
  });
}
