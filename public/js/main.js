import '@babel/polyfill';
import { addCart } from './addcart.js';

let addtocart = $('.add-to-cart');
if (addtocart) {
  addtocart.each((index, btnElement) => {
    btnElement.addEventListener('click', (e) => {
      let getPizzaAdded = JSON.parse(btnElement.dataset.pizza);
      addCart(getPizzaAdded);
      console.log(getPizzaAdded);
    });
  });
}
