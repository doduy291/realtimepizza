const DBmenu = require('../models/menu');

exports.getHome = async (req, res) => {
  const pizzaMenu = await DBmenu.find();
  return res.render('client/home', { pizzaMenu: pizzaMenu });
};
