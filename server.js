import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Music from './models/MusicModel.js';

const app = express();

dotenv.config();

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

app.post('/addmusic', async (req, res) => {
  const { name, artist, path, img } = req.body;

  try {
    let music = await new Music({ name, artist, path, img });
    music = await music.save();
    return res.status(200).json(music);
  } catch (error) {
    console.log(error);
  }
});

app.get('/allmusic', async (req, res) => {
  try {
    const allMusic = await Music.find({});

    return res.status(200).json(allMusic);
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('app running on port 5000'));
