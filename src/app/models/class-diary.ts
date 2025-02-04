export interface ClassDiary {
  id: string;
  date: Date;
  resume: string;
  subjectId: string; // FK para Subject
  classId: string; // FK para Class
}
