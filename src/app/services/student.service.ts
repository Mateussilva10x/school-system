import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student } from '../models/student';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [
    { id: '1', name: 'João Silva', birthDate: moment(new Date(2008, 5, 15)).format('DD/MM/YYYY') , classId: '101' },
    { id: '2', name: 'Maria Oliveira', birthDate: moment(new Date(2007, 8, 22)).format('DD/MM/YYYY'), classId: '102' },
    { id: '3', name: 'Carlos Santos', birthDate: moment(new Date(2009, 2, 10)).format('DD/MM/YYYY'), classId: '101' },
    { id: '4', name: 'Ana Costa', birthDate: moment(new Date(2008, 10, 5)).format('DD/MM/YYYY'), classId: '102' },
  ];

  constructor() {}

  getStudents(filters?: { year?: number; classId?: string }): Observable<Student[]> {
    let filteredStudents = this.students;

    if (filters?.classId) {
      filteredStudents = filteredStudents.filter(student => student.classId === filters.classId);
    }

    if (filters?.year) {
      filteredStudents = filteredStudents.filter(
        student => new Date(student.birthDate).getFullYear() === filters.year
      );
    }

    console.log(filteredStudents)
    return of(filteredStudents);
  }

  getStudentById(id: string): Observable<Student | undefined> {
    return of(this.students.find(student => student.id === id));
  }

  addStudent(student: Student): Observable<Student> {
    this.students.push(student);
    return of(student);
  }

  updateStudent(id: string, updatedStudent: Student): Observable<Student | null> {
    const index = this.students.findIndex(student => student.id === id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
      return of(updatedStudent);
    }
    return of(null);
  }

  deleteStudent(id: string): Observable<boolean> {
    const initialLength = this.students.length;
    this.students = this.students.filter(student => student.id !== id);
    return of(this.students.length < initialLength);
  }
}
