export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface DischargeEntry {
  date: string,
  criteria: string
}

export interface SickLeaveEntry {
  startDate: string,
  endDate: string
}

interface BaseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<Diagnose["code"]>
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: DischargeEntry
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: SickLeaveEntry
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;
export type NewBaseEntry = Omit<BaseEntry, "id">;
export type NewEntry = Omit<HealthCheckEntry, "id"> | Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcareEntry, "id">;

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Array<Entry>
}

export type NewPatient = Omit<Patient, "id" | "entries">;
export type ProtectedPatient = Omit<Patient, "ssn" | "entries">;
