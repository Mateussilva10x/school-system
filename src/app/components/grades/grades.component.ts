import { Component, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../interfaces/student';
import { StudentStore } from '../../stores/student.store';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.scss',
})
export class GradesComponent implements OnInit {
  gradesForm!: FormGroup;
  years = [2023, 2024, 2025];
  classes = ['6 ano', '7 ano', '8 ano', '9 ano'];
  subjects = ['Matemática', 'Português', 'Ciências'];
  bimesters = [1, 2, 3, 4];
  students = this.studentStore.studentsSignal;
  loading = this.studentStore.loadingSignal;
  displayedColumns = ['name', 'gradeP1', 'gradeP2', 'average', 'gradeRec'];


  constructor(private fb: FormBuilder, private studentStore: StudentStore) {}

  ngOnInit(): void {
    this.gradesForm = this.fb.group({
      year: [2024, Validators.required],
      class: ['6 ano', Validators.required],
      subject: ['Matemática', Validators.required],
      bimester: ['1', Validators.required],
    });

    this.onFilterChange();
  }

  onFilterChange(): void {
    const { year, class: className } = this.gradesForm.value;
    console.log(year, className)
    this.studentStore.loadStudents(year, className);
  }

  onSubjectChange(): void {
    this.students().forEach((student) => {
      this.gradesForm.get(`gradeP1_${student.id}`)?.reset();
      this.gradesForm.get(`gradeP2_${student.id}`)?.reset();
      this.gradesForm.get(`gradeRec_${student.id}`)?.reset();
      this.gradesForm.get(`average_${student.id}`)?.reset();
    });
  }

  getFormControl(controlName: string): FormControl {
    const control = this.gradesForm.get(controlName);
    if (!control) {
      throw new Error(`Form control '${controlName}' not found in the form.`);
    }
    return control as FormControl;
  }

  saveGrades(): void {
    const studentsWithGrades: Student[] = this.students().map((student) => ({
      ...student,
      grades: [
        {
          subject: this.gradesForm.value.subject,
          bimester: this.gradesForm.value.bimester,
          gradeP1: this.gradesForm.get(`gradeP1_${student.id}`)?.value,
          gradeP2: this.gradesForm.get(`gradeP2_${student.id}`)?.value,
          gradeRec: this.gradesForm.get(`gradeRec_${student.id}`)?.value,
          average: this.gradesForm.get(`average_${student.id}`)?.value,
        },
      ],
    }));

    this.studentStore.saveGrades(studentsWithGrades);
  }

  calculateAverage(studentId: number): void {
    const gradeP1 = this.gradesForm.get(`gradeP1_${studentId}`)?.value || 0;
    const gradeP2 = this.gradesForm.get(`gradeP2_${studentId}`)?.value || 0;
    const average = (gradeP1 + gradeP2) / 2;
    this.gradesForm.get(`average_${studentId}`)?.setValue(average);
  }
}
