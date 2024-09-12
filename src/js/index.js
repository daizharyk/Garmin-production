import { createCards , scrollToItems , createNewCards } from './html.js';
import data from '../data/item.json' with { type: 'json' };
import '../style/style.css';
import '../style/shipping.css';
import '../style/itempage.css';

console.log(data);

createCards(data);
scrollToItems();
createNewCards();

