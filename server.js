import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import Music from "./models/MusicModel.js";
import Rsvp from "./models/RsvpModel.js";

const app = express();

dotenv.config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.egm3f.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log("database conection succesfully"))
  .catch((err) => console.log(err));

app.post("/addmusic", async (req, res) => {
  const { name, artist, path, img } = req.body;

  try {
    let music = await new Music({ name, artist, path, img });
    music = await music.save();
    return res.status(200).json(music);
  } catch (error) {
    console.log(error);
  }
});

app.get("/allmusic", async (req, res) => {
  try {
    const allMusic = await Music.find({});

    return res.status(200).json(allMusic);
  } catch (error) {
    console.log(error);
  }
});

app.post("/addrsvp", async (req, res) => {
  const { full_name, email_address, phone } = req.body;

  try {
    let rsvp = await new Rsvp({ full_name, email_address, phone });
    rsvp = await rsvp.save();
    return res.status(200).json(rsvp);
  } catch (error) {
    console.log(error);
  }
});

app.get("/allrsvps", async (req, res) => {
  try {
    const allRsvps = await Rsvp.find({});

    return res.status(200).json(allRsvps);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delrsvp", async (req, res) => {
  if (!req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "Rsvp not found" });
  }

  const rsvp = await Rsvp.findById(req.query.id);

  if (rsvp) {
    await rsvp.remove();
    return res.json({ message: "Rsvp removed successfully" });
  } else {
    return res.status(404).json({ message: "Rsvp not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("app running on port 5000"));
