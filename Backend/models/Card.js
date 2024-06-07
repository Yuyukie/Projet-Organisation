const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Card", cardSchema);
