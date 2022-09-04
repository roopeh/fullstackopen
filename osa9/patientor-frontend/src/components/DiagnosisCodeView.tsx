import { useStateValue } from "../state";
import { Entry } from "../types";

interface DiagnosisProps {
  entry: Entry
}

const DiagnosisCodesView = ({ entry }: DiagnosisProps) => {
  const [{ diagnoses }, ] = useStateValue();

  const getDiagnosisName = (diagnosisCode: string): string | null => {
    const diagnosisEntry = diagnoses[diagnosisCode];
    if (!diagnosisEntry) {
      return null;
    }

    return diagnosisEntry.name;
  };

  return (
    <div>
      {entry.diagnosisCodes
      ? <ul>
          {entry.diagnosisCodes.map((diagnosis) => (
            <li key={diagnosis}>
              {diagnosis} {getDiagnosisName(diagnosis)}
            </li>
          ))}
        </ul>
      : null}
    </div>
  );
};

export default DiagnosisCodesView;
