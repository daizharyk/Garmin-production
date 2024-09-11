import { createCards , scrollToItems , createNewCards } from './html.js';
import data from '../data/item.json' with { type: 'json' };



createCards(data);
scrollToItems();
createNewCards();

