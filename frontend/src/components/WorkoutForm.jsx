import { useState } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

export default function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Method 1
    // try {
    //   axios
    //     .post("http://localhost:3000/api/workouts", {
    //       title,
    //       reps,
    //       load,
    //     })
    //     .then((result) => {
    //       console.log(result);
    //       if (result.status === 200) {
    //         setTitle("");
    //         setLoad("");
    //         setReps("");
    //         setError(null);
    //       }
    //     })
    //     .catch((err) => {
    //       setError(err);
    //     });
    // } catch (err) {
    //   console.log(err);
    // }

    // Method 2

    const workout = { title, load, reps };

    const response = await fetch("http://localhost:3000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      console.log("new workout added:", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Exercice Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />
      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
