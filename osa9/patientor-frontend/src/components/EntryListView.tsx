import DiagnosisCodesView from "./DiagnosisCodeView";
import {
  Entry, Patient, HealthCheckEntry, OccupationalHealthcareEntry,
  HospitalEntry, HealthCheckRating
} from "../types";
import { assertNever } from "../utils";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const getHealthIconColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return "#1EFF00";
    case HealthCheckRating.LowRisk:
      return "#FCFF00";
    case HealthCheckRating.HighRisk:
      return "#FF9400";
    default:
      return "#FF0000";
  }
};

const HealthCheckView = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div>
      {entry.date} <MedicalServicesIcon fontSize={"small"} />
      <br />
      <i>{entry.description}</i>
      <br />
      {entry.diagnosisCodes
      ? <DiagnosisCodesView entry={entry} />
      : null}
      <FavoriteIcon htmlColor={getHealthIconColor(entry.healthCheckRating)} />
      <br />
      diagnose by {entry.specialist}
    </div>
  );
};

const OccupationalHealthcareView = ({ entry }:
{ entry: OccupationalHealthcareEntry }) => {
  return (
    <div>
      {entry.date} <WorkIcon fontSize={"small"} /> <i>{entry.employerName}</i>
      <br />
      <i>{entry.description}</i>
      <br />
      {entry.diagnosisCodes
      ? <DiagnosisCodesView entry={entry} />
      : null}
      {entry.sickLeave
      ? <ul>
        <li>Sick leave from <b>{entry.sickLeave.startDate}</b> to <b>{entry.sickLeave.endDate}</b></li>
      </ul>
      : null}
      diagnose by {entry.specialist}
    </div>
  );
};

const HospitalView = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      {entry.date} <MedicalServicesIcon fontSize={"small"} />
      <br />
      <i>{entry.description}</i>
      <br />
      {entry.diagnosisCodes
      ? <DiagnosisCodesView entry={entry} />
      : null}
      <ul>
        <li>Discharged from hospital {entry.discharge.date}: <i>{entry.discharge.criteria}</i></li>
      </ul>
      diagnose by {entry.specialist}
    </div>
  );
};

interface EntryListProps {
  patient: Patient
}

const EntryListView = ({ patient }: EntryListProps) => {
  const getEntryView = (entry: Entry) => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheckView entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareView entry={entry} />;
      case "Hospital":
        return <HospitalView entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <h3>entries</h3>
      {patient.entries.map((entry: Entry) => (
        <div key={entry.id}>
          <Card sx={{ border: 1 }}>
            <CardContent>
              {getEntryView(entry)}
            </CardContent>
          </Card>
          <br />
        </div>
      ))}
    </div>
  );
};

export default EntryListView;
