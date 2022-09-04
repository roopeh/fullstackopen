import diagnoseData from "../data/diagnoses.json";
import { Diagnose } from "../types/types";

const diagnoses: Array<Diagnose> = diagnoseData;

const getDiagnoses = (): Array<Diagnose> => diagnoses;

const isDiagnoseCode = (code: string): string => {
  if (!diagnoses.find((itr) => itr.code === code)) {
    throw new Error(`Invalid diagnose code ${code}`);
  }

  return code;
};

export default {
  getDiagnoses,
  isDiagnoseCode
};
