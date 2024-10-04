import data from "../data/item.json" with { type: "json" };


async function getItemById(itemId) {
  const response = await fetch(`http://localhost:3005/api/items/${itemId}`); // Запрос к вашему API для получения элемента по ID

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const item = await response.json(); 

  return item; 
}

const params = new URLSearchParams(location.search);
const itemId = params.get("id");

export async function loadItem() {
  const item = await getItemById(itemId); 
  return item; 
}



export async function fetchData() {
  const response = await fetch('http://localhost:3005/api/items');
 
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  
  return data;
}



