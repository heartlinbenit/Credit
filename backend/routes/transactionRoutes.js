const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Create transaction
router.post('/', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);

    // Simple fraud detection example
    transaction.isFraud = transaction.amount > 10000;

    await transaction.save();
    res.status(201).json({ message: "Transaction saved" });
  } catch (error) {
    res.status(500).json({ message: "Error saving transaction", error });
  }
});

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});

module.exports = router;
