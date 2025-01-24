import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'https://api.example.com/students';
  constructor(private http: HttpClient) {}

  getStudentsByFilter(year: number, className: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}?year=${year}&class=${className}`);
  }

  saveGrades(students: Student[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/save-grades`, students);
  }
}
