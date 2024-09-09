
import data from '../data/item.json' with { type: 'json' };

// Функция для создания карточек
export function createCards(data) {
  const container = document.getElementById('cards-container')

  data.items.forEach(item => {
    // Создание карточки
    const card = document.createElement('div');
    card.classList.add('item-card');

    const link = document.createElement('a');
    link.href = ``

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

let shopall = document.getElementById("shopall")
let cardsContent = document.querySelector(".cards-content");


let scrollIntoElement = (el) => {
  el.scrollIntoView ({behavior: "smooth"})
};
shopall.addEventListener("click" , (e) =>{
  e.preventDefault();
  scrollIntoElement(cardsContent)
});






