import { Injectable, signal } from '@angular/core';
import { Class } from '../models/class';
import { StudentService } from './student.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private classrooms = signal<Class[]>([
    { id: '101', name: '6º Ano A', schoolYear: 2024 },
    { id: '102', name: '7º Ano B', schoolYear: 2024 },
  ]);

  constructor(private studentService: StudentService) {}

  getClassrooms(): Observable<Class[]> {
    return of(this.classrooms());
  }

  addClassroom(classroom: Class): Observable<Class> {
    this.classrooms.update(classes => [...classes, classroom]);
    return of(classroom);
  }

  getTotalStudents(classId: string): number {
    return this.studentService.getStudentCountByClass(classId);
  }

}
