export interface HeaderProps {
  name: string
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartExtended extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CoursePartExtended {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartExtended {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseRequirementsPart extends CoursePartExtended {
  type: "special"
  requirements: Array<string>
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementsPart;

export interface CourseParts {
  courseParts: Array<CoursePart>
}

export interface PartProps {
  part: CoursePart
}
