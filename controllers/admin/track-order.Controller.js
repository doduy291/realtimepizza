const DBorder = require('../../models/order');

exports.getTrackOrder = async (req, res) => {
  const gettrackorder = await DBorder.find({ status: { $ne: 'completed' } })
    .sort({ createdAt: 'desc' })
    .populate('iduser');
  if (req.xhr) {
    return res.json(gettrackorder);
  } else {
    return res.render('admin/track-order');
  }
};
