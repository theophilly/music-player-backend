import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema({
  full_name: {
    type: String,
  },
  email_address: {
    type: String,
  },
  guest_type: {
    type: String,
  },
  phone: {
    type: Number,
  },
});

export default mongoose.model("Rsvp", rsvpSchema);
