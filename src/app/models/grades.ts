export interface Grades {
  id: string;
  studentId: string; // FK para Student
  subjectId: string; // FK para Subject
  bimesterId: string; // FK para Bimester
  P1: number;
  P2: number;
  recovery?: number;
  average: number;
}
