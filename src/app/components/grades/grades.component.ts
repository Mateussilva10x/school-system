import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.scss',
})
export class GradesComponent implements OnInit {
  gradesForm!: FormGroup;
  years = [2023, 2024, 2025];
  classes = ['6 ano', '7 ano', '8 ano', '9 ano'];
  subjects = ['Matemática', 'Português', 'Ciências'];
  bimesters = [1, 2, 3, 4];
  filteredStudents: {
    id: number;
    name: string;
    year: number;
    class: string;
    grades: { subject: string; bimester: number; gradeP1: number; gradeP2: number; gradeRec?: number; average: number }[];
  }[] = [];
  students = [
    {
      id: 1,
      name: 'João Silva',
      year: 2024,
      class: '6 ano',
      grades: [],
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      year: 2024,
      class: '6 ano',
      grades: [],
    },
    {
      id: 3,
      name: 'Carlos Santos',
      year: 2024,
      class: '6 ano',
      grades: [],
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.gradesForm = this.fb.group({
      year: [2024, Validators.required],
      class: ['6 ano', Validators.required],
      subject: ['Matemática', Validators.required],
      bimester: [1, Validators.required],
    });

    this.filteredStudents = this.students.filter(
      (student) => student.year === 2024 && student.class === '6 ano'
    );

    this.addGradeControls();
  }

  addGradeControls(): void {
    this.filteredStudents.forEach((student) => {
      const p1ControlName = `gradeP1_${student.id}`;
      const p2ControlName = `gradeP2_${student.id}`;
      const recControlName = `gradeRec_${student.id}`;
      const averageControlName = `average_${student.id}`;

      if (!this.gradesForm.contains(p1ControlName)) {
        this.gradesForm.addControl(
          p1ControlName,
          this.fb.control(null, [Validators.required, Validators.min(0), Validators.max(10)])
        );
      }

      if (!this.gradesForm.contains(p2ControlName)) {
        this.gradesForm.addControl(
          p2ControlName,
          this.fb.control(null, [Validators.required, Validators.min(0), Validators.max(10)])
        );
      }

      if (!this.gradesForm.contains(recControlName)) {
        this.gradesForm.addControl(recControlName, this.fb.control(null, [Validators.min(0), Validators.max(10)]));
      }

      if (!this.gradesForm.contains(averageControlName)) {
        this.gradesForm.addControl(averageControlName, this.fb.control({ value: null, disabled: true }));
      }
    });
  }

  onFilterChange(): void {
    const { year, class: selectedClass } = this.gradesForm.value;
    this.filteredStudents = this.students.filter(
      (student) => student.year === year && student.class === selectedClass
    );

    this.addGradeControls();
  }

  onSubjectChange(): void {
    this.filteredStudents.forEach((student) => {
      this.gradesForm.get(`gradeP1_${student.id}`)?.reset();
      this.gradesForm.get(`gradeP2_${student.id}`)?.reset();
      this.gradesForm.get(`gradeRec_${student.id}`)?.reset();
      this.gradesForm.get(`average_${student.id}`)?.reset();
    });
  }

  calculateAverage(studentId: number): void {
    const p1 = this.gradesForm.get(`gradeP1_${studentId}`)?.value;
    const p2 = this.gradesForm.get(`gradeP2_${studentId}`)?.value;

    if (p1 !== null && p2 !== null) {
      const average = (p1 + p2) / 2;
      this.gradesForm.get(`average_${studentId}`)?.setValue(average.toFixed(2));
    }
  }

  saveGrades(): void {
    if (this.gradesForm.valid) {
      const { subject, bimester } = this.gradesForm.value;

      const grades = this.filteredStudents.map((student) => ({
        studentId: student.id,
        subject,
        bimester,
        gradeP1: this.gradesForm.get(`gradeP1_${student.id}`)?.value,
        gradeP2: this.gradesForm.get(`gradeP2_${student.id}`)?.value,
        gradeRec: this.gradesForm.get(`gradeRec_${student.id}`)?.value,
        average: this.gradesForm.get(`average_${student.id}`)?.value,
      }));

      console.log('Grades saved:', grades);
      alert('Notas salvas com sucesso!');
    }
  }
}
