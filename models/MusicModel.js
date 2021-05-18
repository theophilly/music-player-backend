import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  artist: {
    type: String,
  },
  path: {
    type: String,
  },
  img: {
    type: String,
  },
});

export default mongoose.model('Music', musicSchema);
