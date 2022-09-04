export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
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

interface DischargeEntry {
  date: string,
  criteria: string
}

interface SickLeaveEntry {
  startDate: string,
  endDate: string
}

interface BaseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<Diagnosis["code"]>
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: DischargeEntry
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: SickLeaveEntry
}

export interface NewEntryForm {
  type: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes: Array<Diagnosis["code"]>,
  healthCheckRating: HealthCheckRating,
  discharge: DischargeEntry,
  employerName: string,
  sickLeave: SickLeaveEntry
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;
export type NewBaseEntry = Omit<BaseEntry, "id">;
export type NewEntry = Omit<HealthCheckEntry, "id"> | Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcareEntry, "id">;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<Entry>;
}
