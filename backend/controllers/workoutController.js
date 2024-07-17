const Workout = require("../models/WorkoutModel");
const mongoose = require("mongoose");

// GET all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json({ workouts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such workout" });
  }
  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json({ workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// CREATE a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  // add doc to DB
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// DELETE a workout
const deleteWorkout = async (req, res) => {};

// UPDATE a workout
const updateWorkout = async (req, res) => {};

// EXPORT methods
module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
};
