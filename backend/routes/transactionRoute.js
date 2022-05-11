const express = require('express');
const router = express.Router();
const Transaction = require('../models/transactionModel');

router.route('/makeTransaction').post((req, res) => {
  const transactionId = req.body.transactionId;
  const date = req.body.date;
  const transactionType = req.body.transactionType;
  const from = req.body.from;
  const to = req.body.to;
  const game = req.body.game;
  const amount = req.body.amount;

  const newTransaction = new Transaction({
    transactionId,
    date,
    transactionType,
    from,
    to,
    game,
    amount,
  });

  newTransaction.save();
  res.sendStatus(200);
});

router.route('/getTransactions').get((req, res) => {
  Transaction.find().then((foundTransactions) => res.json(foundTransactions));
});

module.exports = router;
