import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { NewEntry, Patient } from "../types";
import GenderIcon from "../components/GenderIcon";
import EntryListView from "../components/EntryListView";
import Button from "@mui/material/Button";
import AddEntryModal from "../AddEntryModal";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [{ patients }, dispatch] = useStateValue();

  const createError = (err: string) => {
    setError(err);
    console.log(err);
  };

  useEffect(() => {
    const getPatient = async (patientId: string) => {
      try {
        const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
        dispatch(updatePatient(patient));
        setPatient(patient);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          createError(String(err?.response?.data) || "Unknown axios error");
        } else {
          createError("Unknown error when loading patient");
        }
      }
    };

    if (id) {
      const existingPatient = patients[id];
      if (existingPatient && existingPatient.ssn) {
        setPatient(existingPatient);
      } else {
        void getPatient(id);
      }
    }
  }, [id]);

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

  const addNewEntry = async (entryData: NewEntry) => {
    if (!id) {
      createError("Invalid patient");
      return;
    }
    if (entryData.diagnosisCodes && Array.isArray(entryData.diagnosisCodes) && entryData.diagnosisCodes.length === 0) {
      delete entryData.diagnosisCodes;
    }

    try {
      const { data: patient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, entryData);
      dispatch(updatePatient(patient));
      setPatient(patient);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        createError(String(err?.response?.data) || "Unknown axios error");
      } else {
        createError("Unknown error when saving entry");
      }
    }
  };

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>{patient.name} <GenderIcon patient={patient} /></h2>
      <p>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
      <EntryListView patient={patient} />
      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={addNewEntry}
        onClose={closeModal} />
      <Button variant="contained" onClick={() => openModal()}>Add new entry</Button>
    </div>
  );
};

export default PatientPage;
