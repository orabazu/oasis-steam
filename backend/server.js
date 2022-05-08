const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.5uh5f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

mongoose.connect(connectionString);

app.use('/', require('./routes/adRoute'));

app.listen(3001, () => {
  console.log('Express server running on 3001');
});
