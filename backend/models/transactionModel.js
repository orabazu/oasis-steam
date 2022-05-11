const mongoose = require('mongoose');

const transactionsSchema = {
  transactionId: String,
  date: String,
  transactionType: String,
  from: String,
  to: String,
  game: String,
  amount: Number,
};

const Transaction = mongoose.model('Transaction', transactionsSchema, 'transactions');

module.exports = Transaction;
