const notSignIfLogged = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
};

const notAccessBillOrder = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/auth/login');
};

module.exports = { notSignIfLogged, notAccessBillOrder };
