const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  picture: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  start_date: Date,
  end_date: Date,
  type: {
    type: String,
    default: "Atividade",
  },
  subscribed_users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  event_id: {
    type: String,
    required: true,
  },
  price: Number,
  is_available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Activity", ActivitySchema);
