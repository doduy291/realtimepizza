const DBorder = require('../../models/order');

exports.getTrackOrder = async (req, res) => {
  const gettrackorder = await DBorder.find();
  return res.render('admin/track-order');
};
