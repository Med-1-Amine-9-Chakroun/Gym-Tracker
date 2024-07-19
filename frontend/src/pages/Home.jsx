import { useEffect } from "react";
import axios from "axios";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      axios
        .get("http://localhost:3000/api/workouts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((result) => {
          dispatch({ type: "SET_WORKOUTS", payload: result.data.workouts });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}
