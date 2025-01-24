import { Grades } from "./grades";

export interface Student {
  id: number;
  name: string;
  year: number;
  class: string;
  grades: Grades[];
}
