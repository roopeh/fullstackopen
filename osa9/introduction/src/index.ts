import express from "express";
import calculateBmi from "./bmiCalculator";
import { ExercisesParams, calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (!weight || !height || isNaN(weight) || isNaN(height)) {
    res.status(400).json({
      error: "malformatted parameters"
    });
    return;
  }

  res.status(200).json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as ExercisesParams;

  if (!target || !daily_exercises) {
    res.status(400).json({
      error: "parameters missing"
    });
    return;
  }

  if (isNaN(target) || daily_exercises.some((itr) => isNaN(itr))) {
    res.status(400).json({
      error: "malformatted parameters"
    });
    return;
  }

  res.status(200).json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
