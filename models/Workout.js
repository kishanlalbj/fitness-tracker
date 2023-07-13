const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["back", "biceps", "chest", "leg", "shoulder", "abs"],
    required: "true"
  }
});

const Workout = mongoose.model("workouts", WorkoutSchema);

module.exports = Workout;
