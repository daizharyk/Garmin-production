import { createCards , scrollToItems } from './html.js';
import data from '../data/item.json' with { type: 'json' };



createCards(data);
scrollToItems();

