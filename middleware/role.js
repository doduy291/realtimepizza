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

const notAccessAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  return res.redirect('/');
};

module.exports = { notSignIfLogged, notAccessBillOrder, notAccessAdmin };
