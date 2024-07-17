const express = require("express");
const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

//GET all workouts
router.get("/", getAllWorkouts);

//GET a single workout
router.get("/:id", getWorkout);

//POST a new workout
router.post("/", createWorkout);

//DELETE a new workout
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a workout" });
});

//UPDATE a new workout
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a workout" });
});

module.exports = router;
