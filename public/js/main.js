import '@babel/polyfill';
import moment from 'moment';
import { addCart, removeCart } from './cart.js';
import { getBillOrderToSetTrack } from './admin.js';
import { updateStatus } from './updatestatus.js';
import 'moment/locale/vi';

/* *********************************************************** */
// Socket IO Import
let socket = io();

/* *********************************************************** */
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

// Remove Pizza from Cart
let getPizzaRemove = document.querySelectorAll('#removeCart');
if (getPizzaRemove) {
  getPizzaRemove.forEach((el) => {
    el.addEventListener('click', () => {
      let dataIDItem = el.dataset.iditem;
      removeCart(dataIDItem);
    });
  });
}
/* *********************************************************** */
// Change bill order status
let time = document.createElement('small');
let statuses = document.querySelectorAll('.status_line');
let hiddenBillOrder = document.querySelector('#hiddenBillOrderInput');
let order = hiddenBillOrder ? hiddenBillOrder.value : null;
order = JSON.parse(order);
if (hiddenBillOrder) {
  updateStatus(order, statuses, time);
}

// SocketIO - Update Status
// Join
if (hiddenBillOrder) {
  socket.emit('join', `order_${order._id}`);
}

/* *********************************************************** */
// Admin
// let getIDbillorder = document.querySelector('#billorderTableBody');
let getIDbillorder = $('#billorderTableBody');
let adminAreaPath = window.location.pathname;

if (adminAreaPath.includes('admin')) {
  console.log(adminAreaPath);
  getBillOrderToSetTrack(getIDbillorder, socket);
  socket.emit('join', 'adminRoom');
}
// Update Status
socket.on('statusUpdated', (data) => {
  const updatedOrder = { ...order };

  updatedOrder.updatedAt = moment().format();
  updatedOrder.status = data.status;
  console.log(updatedOrder);
  updateStatus(updatedOrder, statuses, time);
});
/* *********************************************************** */
//Remove alert message after specify time
let alertMes = $('#success-alert');
if (alertMes) {
  setTimeout(() => {
    alertMes.remove();
  }, 2000);
}
