import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Music from './models/MusicModel.js';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.egm3f.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log('database conection succesfully'))
  .catch((err) => console.log(err));

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('app running on port 5000'));
