const DBMenu = require('../models/menu');

exports.getCart = (req, res) => {
  return res.render('client/cart');
};

exports.addCart = async (req, res) => {
  // for the first time creating cart and add basic object
  if (!req.session.cart) {
    req.session.cart = {
      items: {},
      totalQty: 0,
      totalPrice: 0,
    };
  }
  let cart = req.session.cart;
  // Check if item does not exist in cart
  if (!cart.items[req.body._id]) {
    cart.items[req.body._id] = {
      pizza: req.body,
      qty: 1,
    };
    cart.totalQty = cart.totalQty + 1;
    cart.totalPrice = cart.totalPrice + req.body.price;
  } else {
    console.log(cart.items[req.body._id]);
    cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
    cart.totalQty = cart.totalQty + 1;
    cart.totalPrice = cart.totalPrice + req.body.price;
  }
  return await res.json({ totalQty: req.session.cart.totalQty });
};
