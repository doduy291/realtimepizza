const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    iduser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: { type: Object, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    paymenttype: { type: String, default: 'COD' },
    status: { type: String, default: 'order_placed' },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema, 'order');

module.exports = Order;
