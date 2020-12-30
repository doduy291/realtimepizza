const DBMenu = require('../models/menu');

exports.getCart = (req, res) => {
  return res.render('client/cart');
};

exports.addCart = async (req, res) => {
  // for the first time creating cart and add basic object
  return await res.json({ data: 'Its Okay' });
};
