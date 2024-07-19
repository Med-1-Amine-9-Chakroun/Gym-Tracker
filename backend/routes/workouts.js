const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

//GET all workouts
router.get("/", getAllWorkouts);

//GET a single workout
router.get("/:id", getWorkout);

//POST a new workout
router.post("/", createWorkout);

//DELETE a new workout
router.delete("/:id", deleteWorkout);

//UPDATE a new workout
router.patch("/:id", updateWorkout);

module.exports = router;
