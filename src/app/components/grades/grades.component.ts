import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  grade?: number;
}

interface Class {
  id: number;
  name: string;
}

interface Subject {
  id: number;
  name: string;
}

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.scss'
})
export class GradesComponent implements OnInit {
  years: number[] = [2022, 2023, 2024];
  classes: Class[] = [
    { id: 1, name: 'Turma A' },
    { id: 2, name: 'Turma B' },
  ];
  subjects: Subject[] = [
    { id: 1, name: 'Matemática' },
    { id: 2, name: 'Português' },
    { id: 3, name: 'História' },
  ];

  selectedYear!: number;
  selectedClass!: number;
  selectedSubject!: number;

  students: Student[] = [
    { id: 1, name: 'João Silva' },
    { id: 2, name: 'Maria Oliveira' },
    { id: 3, name: 'Carlos Santos' },
  ];

  filteredStudents: Student[] = [];
  displayedColumns: string[] = ['name', 'grade'];

  constructor() {}

  ngOnInit(): void {}

  onFilterChange(): void {
    if (this.selectedYear && this.selectedClass && this.selectedSubject) {
      this.filteredStudents = this.students.map(student => ({
        ...student,
        grade: undefined,
      }));
    } else {
      this.filteredStudents = [];
    }
  }

  saveGrades(): void {
    if (this.filteredStudents.some(student => student.grade === undefined)) {
      alert('Por favor, preencha todas as notas antes de salvar.');
      return;
    }

    console.log('Notas salvas:', {
      year: this.selectedYear,
      class: this.selectedClass,
      subject: this.selectedSubject,
      grades: this.filteredStudents.map(student => ({
        id: student.id,
        grade: student.grade,
      })),
    });
    alert('Notas salvas com sucesso!');
  }
}
