import '@babel/polyfill';
import { addCart } from './addcart.js';
import { getBillOrderToSetTrack } from './admin.js';
import { updateStatus } from './updatestatus.js';
import 'moment/locale/vi';

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

// Change bill order status
let time = document.createElement('small');
let statuses = document.querySelectorAll('.status_line');
let hiddenBillOrder = document.querySelector('#hiddenBillOrderInput');
let order = hiddenBillOrder ? hiddenBillOrder.value : null;
order = JSON.parse(order);
if (hiddenBillOrder) {
  updateStatus(order, statuses, time);
}

//Remove alert message after specify time
let alertMes = $('#success-alert');
if (alertMes) {
  setTimeout(() => {
    alertMes.remove();
  }, 2000);
}

// Admin
// let getIDbillorder = document.querySelector('#billorderTableBody');
let getIDbillorder = $('#billorderTableBody');
if (getIDbillorder) {
  getBillOrderToSetTrack(getIDbillorder);
}
