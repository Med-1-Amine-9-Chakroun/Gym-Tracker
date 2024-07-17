import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      axios
        .get("http://localhost:3000/api/workouts")
        .then((result) => {
          setWorkouts(result.data.workouts);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchWorkouts();
  }, []);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => <p key={workout._id}>{workout.title}</p>)}
      </div>
    </div>
  );
}
