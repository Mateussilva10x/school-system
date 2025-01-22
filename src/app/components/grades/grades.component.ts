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
  filteredStudents: { id: number; name: string }[] = [];
  students = [
    { id: 1, name: 'João Silva', year: 2024, class: '6 ano', subject: 'Matemática' },
    { id: 2, name: 'Maria Oliveira', year: 2024, class: '7 ano', subject: 'Português' },
    { id: 3, name: 'Carlos Santos', year: 2024, class: '6 ano', subject: 'Ciências' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.gradesForm = this.fb.group({
      year: [2024, Validators.required],
      class: ['6 ano', Validators.required],
      subject: ['Matemática', Validators.required],
    });

    this.onFilterChange();
  }

  onFilterChange(): void {
    const selectedYear = this.gradesForm.get('year')?.value;
    const selectedClass = this.gradesForm.get('class')?.value;
    const selectedSubject = this.gradesForm.get('subject')?.value;

    this.filteredStudents = this.students.filter(
      (student) =>
        student.year === selectedYear &&
        student.class === selectedClass &&
        student.subject === selectedSubject
    );

    const allStudentIds = this.students.map((student) => `grade_${student.id}`);
    this.filteredStudents.forEach((student) => {
      const controlName = `grade_${student.id}`;
      if (!this.gradesForm.contains(controlName)) {
        this.gradesForm.addControl(
          controlName,
          this.fb.control(null, [Validators.required, Validators.min(0), Validators.max(10)])
        );
      }
    });

    allStudentIds.forEach((controlName) => {
      const studentId = parseInt(controlName.split('_')[1], 10);
      if (!this.filteredStudents.some((student) => student.id === studentId)) {
        this.gradesForm.removeControl(controlName);
      }
    });
  }

  saveGrades(): void {
    if (this.gradesForm.valid) {
      const grades = this.filteredStudents.map((student) => ({
        studentId: student.id,
        grade: this.gradesForm.get(`grade_${student.id}`)?.value,
      }));
      console.log('Grades saved:', grades);
      alert('Notas salvas com sucesso!');
    } else {
      alert('Preencha todas as notas corretamente antes de salvar!');
    }
  }
}
