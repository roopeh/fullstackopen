import {
  Patient, ProtectedPatient, NewPatient, Gender, NewEntry, NewBaseEntry,
  HealthCheckRating, DischargeEntry, SickLeaveEntry, Diagnose
} from "../types/types";
import diagnoseService from "../services/diagnoseService";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};

const parseString = (name: string, text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing field '${name}'`);
  }

  return text;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing field 'gender'");
  }

  return gender;
};

const parseHealthRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing field 'healthCheckRating'");
  }

  return rating;
};

const parseDiagnoseArray = (arr: unknown): Array<Diagnose["code"]> => {
  if (!arr || !Array.isArray(arr)) {
    throw new Error("Incorrect array for field 'diagnosisCodes'");
  }

  return arr.map((itr) => diagnoseService.isDiagnoseCode(parseString("diagnosisCodes", itr)));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const readPatientFields = (data: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString("name", data.name),
    dateOfBirth: parseString("dateOfBirth", data.dateOfBirth),
    ssn: parseString("ssn", data.ssn),
    gender: parseGender(data.gender),
    occupation: parseString("occupation", data.occupation),
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const readEntryFields = (data: any): NewEntry => {
  const newBaseEntry: NewBaseEntry = {
    description: parseString("description", data.description),
    date: parseString("date", data.date),
    specialist: parseString("specialist", data.specialist),
    diagnosisCodes: data.diagnosisCodes
      ? parseDiagnoseArray(data.diagnosisCodes)
      : undefined
  };

  switch (data.type) {
    case "HealthCheck":
      return {
        type: "HealthCheck",
        healthCheckRating: parseHealthRating(data.healthCheckRating),
        ...newBaseEntry
      };
    case "Hospital":
      const discharge: DischargeEntry = {
        date: parseString("discharge.date", data.discharge.date),
        criteria: parseString("discharge.criteria", data.discharge.criteria)
      };

      return {
        type: "Hospital",
        discharge,
        ...newBaseEntry
      };
    case "OccupationalHealthcare":
      const sickLeave: SickLeaveEntry | undefined = 
        data.sickLeave
        ? {
          startDate: parseString("startDate", data.sickLeave.startDate),
          endDate: parseString("endDate", data.sickLeave.endDate)
        }
        : undefined;

      return {
        type: "OccupationalHealthcare",
        employerName: parseString("employerName", data.employerName),
        sickLeave,
        ...newBaseEntry
      };
    default:
      throw new Error("Bad type for entry");
  }
};

const stripSsnField = (patient: Patient): ProtectedPatient => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, entries, ...strippedPatient } = patient;
  return strippedPatient;
};

const writeErrorMessage = (error: unknown): string => {
  let errorMessage = "Something went wrong";
  if (error instanceof Error) {
    errorMessage += " : " + error.message;
  }

  return errorMessage;
};

export {
  readPatientFields, readEntryFields, stripSsnField, writeErrorMessage
};