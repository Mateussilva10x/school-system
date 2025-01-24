import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private students = signal<Student[]>([]);
  private loading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  loadingSignal = this.loading.asReadonly();

  loadStudents(year: number, schoolClass: string): void {
    this.loading.set(true);
    this.http
      .get<Student[]>(`https://api.example.com/students?year=${year}&class=${schoolClass}`)
      .subscribe({
        next: (students) => {
          this.students.set(students);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }

  saveGrades(students: Student[]): void {
    this.http
      .post<void>(`https://api.example.com/students/save-grades`, students)
      .subscribe(() => {
        console.log('Notas salvas com sucesso!');
      });
  }

  get studentsSignal() {
    return this.students.asReadonly();
  }
}
