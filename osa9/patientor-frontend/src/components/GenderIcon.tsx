import { Patient, Gender } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

interface GenderIconProps {
  patient: Patient
}

const GenderIcon = ({ patient }: GenderIconProps) => {
  switch (patient.gender) {
    case Gender.Male:
      return <MaleIcon />;
    case Gender.Female:
      return <FemaleIcon />;
    default:
      return <TransgenderIcon />;
  }
};

export default GenderIcon;
