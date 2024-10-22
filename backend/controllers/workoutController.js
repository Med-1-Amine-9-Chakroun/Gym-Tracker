const Workout = require("../models/WorkoutModel");
const mongoose = require("mongoose");

// GET all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const workouts = await Workout.find({ user_id }).sort({
      createdAt: -1,
    });
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
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  // add doc to DB
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such workout" });
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      res.status(400).json({ error: "No such workout" });
    }
    res.status(200).json({ workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such workout" });
  }
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!workout) {
      res.status(400).json({ error: "No such workout" });
    }
    res.status(200).json({ workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// EXPORT methods
module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
