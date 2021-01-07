const DBorder = require('../models/order');
let moment = require('moment');
moment.locale('vi');
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

exports.orderCart = async (req, res) => {
  const { address, phonenumber } = req.body;
  if (!address || !phonenumber) {
    req.flash('message', 'No blank');
    return res.redirect('/cart');
  }
  // Create new order
  await DBorder.create({
    iduser: req.user._id,
    items: req.session.cart.items,
    phone: phonenumber,
    address: address,
  })
    .then((resultOrder) => {
      req.flash('success', 'Order successfully!');
      delete req.session.cart;
      return res.redirect('/cart/bill-order');
    })
    .catch((err) => {
      req.flash('error', 'Something wrong!');
      return res.redirect('/cart');
    });

  // Or Other way
  // const order = await DBorder.create({
  //   iduser: req.user._id,
  //   items: req.session.cart.items,
  //   phone: phonenumber,
  //   address: address,
  // });
  // OR
  // const order = new DBorder({
  //   iduser: req.user._id,
  //   items: req.session.cart.items,
  //   phone: phonenumber,
  //   address: address,
  // });

  // order
  //   .save()
  //   .then((resultOrder) => {
  //     req.flash('success', 'Order successfully!');
  //     return res.redirect('/cart');
  //   })
  //   .catch((err) => {
  //     req.flash('error', 'Something wrong!');
  //     return res.redirect('/cart');
  //   });
};

exports.billorderCart = async (req, res) => {
  const listbillorders = await DBorder.find({ iduser: req.user._id }).sort({ createdAt: 'desc' });
  return res.render('client/bill-order', { listBillOrders: listbillorders, moment: moment });
};
