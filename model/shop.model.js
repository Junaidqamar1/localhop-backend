const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  description: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: [Number],
    },
  },
  phone: String,
  image: String,
  services: {
    pickup: Boolean,
    delivery: Boolean,
    seatBooking: Boolean,
  },
  openHours: {
    start: String,
    end: String,
  },
});


shopSchema.index({ "address.location": "2dsphere" });

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
