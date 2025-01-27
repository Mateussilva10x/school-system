import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {

  private mockStudents: Student[] = [
    {
      id: 1,
      name: 'João Silva',
      year: 2024,
      class: '6 ano',
      grades: [
        { subject: 'Matemática', bimester: 1, gradeP1: 8, gradeP2: 7, average: 7.5 },
        { subject: 'Português', bimester: 1, gradeP1: 6, gradeP2: 7, average: 6.5 },
      ],
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      year: 2024,
      class: '6 ano',
      grades: [
        { subject: 'Matemática', bimester: 1, gradeP1: 9, gradeP2: 8, average: 8.5 },
        { subject: 'Português', bimester: 1, gradeP1: 7, gradeP2: 8, average: 7.5 },
      ],
    },
    {
      id: 3,
      name: 'Carlos Santos',
      year: 2024,
      class: '7 ano',
      grades: [
        { subject: 'Matemática', bimester: 1, gradeP1: 5, gradeP2: 6, average: 5.5 },
      ],
    },
  ];

  private students = signal<Student[]>([]);
  private loading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  loadingSignal = this.loading.asReadonly();

  loadStudents(year: number, schoolClass: string): void {
    this.loading.set(true);

    setTimeout(() => {
      const filteredStudents = this.mockStudents.filter(
        (student) => student.year === year && student.class === schoolClass
      );

      this.students.set(filteredStudents);
      this.loading.set(false);
    }, 500);
  }

  saveGrades(updatedStudents: Student[]): void {
    updatedStudents.forEach((updatedStudent) => {
      const studentIndex = this.mockStudents.findIndex((student) => student.id === updatedStudent.id);
      if (studentIndex !== -1) {
        this.mockStudents[studentIndex].grades = updatedStudent.grades;
      }
    });

    console.log('Notas salvas com sucesso!', this.mockStudents);
  }

  get studentsSignal() {
    return this.students.asReadonly();
  }
}
