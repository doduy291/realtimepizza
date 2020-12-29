exports.getLogin = (req, res) => {
  return res.render('auth/login');
};

exports.getRegister = (req, res) => {
  return res.render('auth/register');
};
