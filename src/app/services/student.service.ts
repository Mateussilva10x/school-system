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
    { id: '1', name: 'João Silva', birthDate: "2008-02-15" , classId: '101', schoolYear: 2025 },
    { id: '2', name: 'Maria Oliveira', birthDate: "2007-08-22", classId: '102', schoolYear: 2025 },
    { id: '3', name: 'Carlos Santos', birthDate: "2009-10-02", classId: '101', schoolYear: 2025 },
    { id: '4', name: 'Ana Costa', birthDate: "2010-10-08", classId: '102', schoolYear: 2025 },
  ];

  constructor() {}

  getStudents(filters?: { schoolYear?: number; classId?: string }): Observable<Student[]> {
    let filteredStudents = this.students;

    if (filters?.classId) {
      filteredStudents = filteredStudents.filter(student => student.classId === filters.classId);
    }

    if (filters?.schoolYear) {
      filteredStudents = filteredStudents.filter(student => student.schoolYear === filters.schoolYear);
    }

    return of(filteredStudents);
  }

  getStudentCountByClass(classId: string): number {
    return this.students.filter(student => student.classId === classId).length;
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
