const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MetricSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    required: true,
    unique: true
  },
  weight: {
    type: Number,
    required: true
  },
  neck: {
    type: Number,
    required: true
  },
  waist: {
    type: Number,
    requried: true
  },
  bmi: {
    type: Number,
    requried: true
  },
  bodyFat: {
    type: Number,
    required: true
  },
  bmr: {
    type: Number,
    required: true
  }
});

const Metric = mongoose.model("weights", MetricSchema);

module.exports = Metric;
