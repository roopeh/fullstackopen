import { v1 as uuid } from "uuid";
import patientData from "../data/patients";
import { Patient, NewPatient, ProtectedPatient, Entry, NewEntry } from "../types/types";
import { stripSsnField } from "../utils/utils";

let patients: Array<Patient> = patientData;

const getPatients = (): Array<ProtectedPatient> => {
  return patients.map((patient) => stripSsnField(patient));
};

const getPatient = (id: unknown): Patient => {
  const patient = patients.find((itr) => itr.id === id);
  if (!patient) {
    throw new Error("Patient not found (Invalid id)");
  }

  return patient;
};

const addPatient = (data: NewPatient): ProtectedPatient => {
  const newPatient: Patient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...data,
    entries: new Array<Entry>
  };

  patients.push(newPatient);
  return stripSsnField(newPatient);
};

const addEntry = (patient: Patient, data: NewEntry): Patient => {
  const newEntry: Entry = {
    id: uuid(),
    ...data
  };

  const changedPatient = {
    ...patient,
    entries: patient.entries.concat(newEntry)
  };

  patients = patients.map((itr) => itr.id === patient.id ? changedPatient : itr);
  return changedPatient;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry
};
