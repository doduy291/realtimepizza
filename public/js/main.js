import '@babel/polyfill';
import { addCart } from './addcart.js';

// Add Pizza to Cart
let addtocart = $('.add-to-cart');
let getCartCount = $('.cartCount');
if (addtocart) {
  addtocart.each((index, btnElement) => {
    btnElement.addEventListener('click', (e) => {
      let getPizzaAdded = JSON.parse(btnElement.dataset.pizza);
      addCart(getPizzaAdded, getCartCount);
      console.log(getPizzaAdded);
    });
  });
}
