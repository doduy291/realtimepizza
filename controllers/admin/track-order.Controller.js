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

exports.updateStatusTrackOrder = async (req, res) => {
  await DBorder.updateOne({ _id: req.body.idorder }, { status: req.body.status }).then((result) => {
    if (!result) {
      return res.redirect('/admin/track-order');
    }
    return res.redirect('/admin/track-order');
  });
};
