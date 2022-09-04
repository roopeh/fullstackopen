interface Exercises {
  periodLenght: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

export interface ExercisesParams {
  target: number,
  daily_exercises: Array<number>,
}

export const calculateExercises = (exercises: Array<number>, target: number): Exercises => {
  let trainingDays = 0;
  exercises.forEach((hours) => hours > 0 ? ++trainingDays : null);

  const average = ((exercises.reduce((a, b) => a + b, 0)) / exercises.length) || 0;

  let rating: number, ratingDescription: string;
  if (average >= target) {
    rating = 3;
    ratingDescription = "Goal achieved!";
  } else if (average >= (target - 1)) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "You need to work harder";
  }

  return {
    periodLenght: exercises.length,
    trainingDays,
    success: average >= target ? true : false,
    rating,
    ratingDescription,
    target,
    average,
  };
};

/* const parseExerciseValues = (args: Array<string>): ExercisesParams => {
  if (args.length < 4) {
    throw new Error("Missing argument");
  }

  const targetValue = Number(args[2]);
  if (isNaN(targetValue)) {
    throw new Error("Target value was invalid");
  }

  const hoursMap: Array<number> = args.slice(3).map((itr) => Number(itr));
  hoursMap.forEach((itr) => {
    if (isNaN(itr)) {
      throw new Error("One of the hours was invalid");
    }
  });

  return { daily_exercises: hoursMap, target: targetValue };
};

try {
  const { daily_exercises, target } = parseExerciseValues(process.argv);
  console.log(calculateExercises(daily_exercises, target));
} catch (error: unknown) {
  let errorMsg = "Error happened, aborting";
  if (error instanceof Error) {
    errorMsg += " : " + error.message;
  }

  console.log(errorMsg);
} */
