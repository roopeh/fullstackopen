const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi >= 30) {
    return "Obesity";
  } else if (bmi >= 25) {
    return "Overweight";
  } else if (bmi >= 18.5) {
    return "Normal (healthy weight)";
  } else {
    return "Underweight";
  }
};

/* interface BmiData {
  height: number,
  weight: number
}

const parseBmiValues = (args: Array<string>): BmiData => {
  if (args.length < 4) {
    throw new Error("Missing arguments")
  } else if (args.length > 4) {
    throw new Error("Too many arguments")
  }

  const height = Number(args[2])
  const weight = Number(args[3])
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("One of the values was invalid")
  }

  return { height, weight }
}

try {
  const { height, weight } = parseBmiValues(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMsg = "Error happened, aborting"
  if (error instanceof Error) {
    errorMsg += " : " + error.message
  }

  console.log(errorMsg)
} */

export default calculateBmi;
