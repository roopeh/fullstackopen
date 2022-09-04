import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form, FormikErrors } from "formik";
import { HealthRatingOption, TextField, SelectField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { HealthCheckRating, NewEntry, NewEntryForm, NewBaseEntry, Diagnosis } from "../types";

interface Props {
  onSubmit: (values: NewEntry) => void,
  onCancel: () => void
}

const healthRatingOptions: Array<HealthRatingOption> = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.HighRisk, label: "High risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical risk" }
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const createEntry = (data: NewEntryForm): void => {
    const newBaseEntry: NewBaseEntry = {
      description: data.description,
      date: data.date,
      specialist: data.specialist,
      diagnosisCodes: data.diagnosisCodes
    };

    switch (data.type) {
      case "HealthCheck":
        onSubmit({
          type: data.type,
          healthCheckRating: data.healthCheckRating,
          ...newBaseEntry
        });
        break;
      case "Hospital":
        onSubmit({
          type: data.type,
          discharge: data.discharge,
          ...newBaseEntry
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          type: data.type,
          employerName: data.employerName,
          sickLeave: data.sickLeave.startDate || data.sickLeave.endDate
            ? data.sickLeave
            : undefined,
          ...newBaseEntry
        });
        break;
      default:
        alert("Invalid type for entry!");
        break;
    }
  };

  const FormFieldsForEntry = ({ type }: { type: string }) => {
    switch (type) {
      case "HealthCheck":
        return (
          <SelectField
            label="Health check rating"
            name="healthCheckRating"
            options={healthRatingOptions} />
        );
      case "Hospital":
        return (
          <div>
            <Field
              label="Discharge date"
              placeholder="Discharge date"
              name="discharge.date"
              component={TextField} />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField} />
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div>
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField} />
            <Field
              label="Sick leave start date"
              placeholder="Sick leave start date"
              name="sickLeave.startDate"
              component={TextField} />
            <Field
              label="Sick leave end date"
              placeholder="Sick leave end date"
              name="sickLeave.endDate"
              component={TextField} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: new Array<Diagnosis["code"]>,
        healthCheckRating: HealthCheckRating.Healthy,
        discharge: { date: "", criteria: "" },
        employerName: "",
        sickLeave: { startDate: "", endDate: "" }
      }}
      onSubmit={createEntry}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: FormikErrors<NewEntryForm> = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        switch (values.type) {
          case "Hospital": {
            if (!values.discharge.date) {
              errors.discharge = {
                date: requiredError
              };
            }
            if (!values.discharge.criteria) {
              errors.discharge = {
                criteria: requiredError,
                ...errors.discharge
              };
            }
          } break;
          case "OccupationalHealthcare": {
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
          } break;
          default: break;
        }
        return errors;
      }}>
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <div>
              <label>
                <Field type="radio" name="type" value="Hospital" />
                Hospital
              </label>
              <label>
                <Field type="radio" name="type" value="HealthCheck" />
                Health check
              </label>
              <label>
                <Field type="radio" name="type" value="OccupationalHealthcare" />
                Occupational Healthcare
              </label>
            </div>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField} />
            <Field
               label="Date"
               placeholder="Date YYYY-MM-DD"
               name="date"
               component={TextField} />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)} />
            <FormFieldsForEntry type={values.type} />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel} >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{ float: "right" }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid} >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
