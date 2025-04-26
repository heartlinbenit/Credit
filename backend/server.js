const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Import db connection
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON body

// Connect to MongoDB
connectDB();

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  phone: String,
  amount: Number,
  cardNumber: String,
  cvc: String,
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Simple Route
// Add this after POST route
app.get('/transaction', async (req, res) => {
    try {
      const transactions = await Transaction.find();
      res.json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch transactions' });
    }
  });
  

// Transaction Route
app.post('/transaction', async (req, res) => {
  try {
    const { phone, amount, cardNumber, cvc } = req.body;

    // Create a new transaction document
    const transaction = new Transaction({
      phone,
      amount,
      cardNumber,
      cvc,
    });

    // Save the transaction to the database
    await transaction.save();
    
    // Send response
    res.status(201).json({ message: 'Transaction Successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Transaction Failed' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {  // Bind to 0.0.0.0 for Render
  console.log(`Server running on port ${PORT}`);
});