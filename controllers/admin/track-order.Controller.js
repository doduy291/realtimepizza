const DBorder = require('../../models/order');

exports.getTrackOrder = async (req, res) => {
  const gettrackorder = await DBorder.find({ status: { $ne: 'completed' } });
  return res.render('admin/track-order');
};
