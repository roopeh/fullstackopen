import { PartProps } from "../types/types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled union type ${JSON.stringify(value)}`);
};

const Part = ({ part }: PartProps) => {
  switch (part.type) {
    case "normal":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          <i>{part.description}</i>
        </p>
      );
    case "groupProject":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case "submission":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          <i>{part.description}</i>
          <br />
          submit to {part.exerciseSubmissionLink}
        </p>
      );
    case "special":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          <i>{part.description}</i>
          <br />
          required skills: {part.requirements.map((skill) => (
            part.requirements.lastIndexOf(skill)
              ? `${skill}`
              : `${skill}, `
          ))}
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
