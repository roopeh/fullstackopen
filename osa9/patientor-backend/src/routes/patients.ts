import express from "express";
import patientService from "../services/patientService";
import { readEntryFields, readPatientFields, writeErrorMessage } from "../utils/utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.status(200).send(patientService.getPatients());
});

patientsRouter.get("/:id", (req, res) => {
  try {
    res.status(200).send(patientService.getPatient(req.params.id));
  } catch (error) {
    res.status(400).send(writeErrorMessage(error));
  }
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatient = patientService.addPatient(readPatientFields(req.body));
    res.status(200).json(newPatient);
  } catch (error) {
    res.status(400).send(writeErrorMessage(error));
  }
});

patientsRouter.post("/:id/entries", (req, res) => {
  try {
    // Test patient id first
    const patient = patientService.getPatient(req.params.id);
    const changedPatient = patientService.addEntry(patient, readEntryFields(req.body));
    res.status(200).send(changedPatient);
  } catch (error) {
    res.status(400).send(writeErrorMessage(error));
  }
});

export default patientsRouter;
