import Part from "./Part";
import { CourseParts } from "../types/types";

const Content = ({ courseParts }: CourseParts) => {
  return (
    <div>
      {courseParts.map((part) => <Part key={part.name} part={part} />)}
    </div>
  );
};

export default Content;