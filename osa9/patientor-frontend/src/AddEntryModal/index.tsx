import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { NewEntry } from "../types";
import AddEntryForm from "./AddEntryModal";

interface Props {
  modalOpen: boolean,
  onClose: () => void,
  onSubmit: (values: NewEntry) => void,
  error?: string;
}

const AddEntryModal = (props: Props) => (
  <Dialog fullWidth={true} open={props.modalOpen} onClose={() => props.onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {props.error
      ? <Alert severity="error">{`Error: ${props.error}`}</Alert>
      : null}
      <AddEntryForm onSubmit={props.onSubmit} onCancel={props.onClose} />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
