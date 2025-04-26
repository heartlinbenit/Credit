const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  cardNumber: { type: String, required: true },
  cvc: { type: String, required: true },
  isFraud: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
