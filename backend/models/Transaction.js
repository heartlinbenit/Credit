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

// const mongoose = require('mongoose');

// const transactionSchema = new mongoose.Schema({
//   phone: { type: String, required: true },
//   amount: { type: Number, required: true },
//   cardNumber: { type: String, required: true },
//   cvc: { type: String, required: true },
//   isFraud: { type: Boolean, default: false },
//   location: {
//     type: {
//       type: String,
//       enum: ['Point'],
//       required: true,
//       default: 'Point'
//     },
//     coordinates: {
//       type: [Number],
//       required: true
//     }
//   },
//   createdAt: { type: Date, default: Date.now },
//   deviceInfo: {
//     userAgent: { type: String, required: true },
//     language: { type: String, required: true },
//     screenWidth: { type: Number, required: true },
//     screenHeight: { type: Number, required: true },
//     ip: { type: String, required: true },
//   },
// });

// // Create a 2dsphere index on location for geospatial queries
// transactionSchema.index({ location: '2dsphere' });

// module.exports = mongoose.model('Transaction', transactionSchema);
