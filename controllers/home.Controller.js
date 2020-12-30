const DBMenu = require('../models/menu');

exports.getHome = async (req, res) => {
  const pizzaMenu = await DBMenu.find();
  return res.render('client/home', { pizzaMenu: pizzaMenu });
};
