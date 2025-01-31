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
      bimester: [1, Validators.required],
    });
  }

  async fetchStudents(): Promise<void> {
    const { year, class: className } = this.gradesForm.value;

    this.studentStore.loadStudents(year, className);

    await new Promise((resolve) => setTimeout(resolve, 500));

    this.students().forEach((student) => {
      this.addStudentControls(student.id);

      const savedGrade = student.grades?.find(
        (grade) =>
          grade.subject === this.gradesForm.value.subject &&
          grade.bimester === this.gradesForm.value.bimester
      );

      if (savedGrade) {
        this.gradesForm.get(`gradeP1_${student.id}`)?.setValue(savedGrade.gradeP1);
        this.gradesForm.get(`gradeP2_${student.id}`)?.setValue(savedGrade.gradeP2);
        this.gradesForm.get(`gradeRec_${student.id}`)?.setValue(savedGrade.gradeRec);
        this.gradesForm.get(`average_${student.id}`)?.setValue(savedGrade.average);
      } else {
        this.gradesForm.get(`gradeP1_${student.id}`)?.reset();
        this.gradesForm.get(`gradeP2_${student.id}`)?.reset();
        this.gradesForm.get(`gradeRec_${student.id}`)?.reset();
        this.gradesForm.get(`average_${student.id}`)?.reset();
      }
    });
  }



  addStudentControls(studentId: number): void {
    const controls = [`gradeP1_${studentId}`, `gradeP2_${studentId}`, `gradeRec_${studentId}`, `average_${studentId}`];

    controls.forEach((controlName) => {
      if (!this.gradesForm.contains(controlName)) {
        this.gradesForm.addControl(
          controlName,
          this.fb.control(
            controlName.startsWith('average_') ? { value: null, disabled: true } : null,
            controlName.startsWith('average_')
              ? []
              : [Validators.required, Validators.min(0), Validators.max(10)]
          )
        );
      }
    });
  }


  getFormControl(controlName: string): FormControl {
    const control = this.gradesForm.get(controlName);
    if (!control) {
      throw new Error(`Form control '${controlName}' not found in the form.`);
    }
    return control as FormControl;
  }


  calculateAverage(studentId: number): void {
    const gradeP1 = this.gradesForm.get(`gradeP1_${studentId}`)?.value || 0;
    const gradeP2 = this.gradesForm.get(`gradeP2_${studentId}`)?.value || 0;
    const average = (gradeP1 + gradeP2) / 2;

    this.gradesForm.get(`average_${studentId}`)?.setValue(average);

    if (average < 7) {
      this.gradesForm.get(`gradeRec_${studentId}`)?.enable();
    } else {
      this.gradesForm.get(`gradeRec_${studentId}`)?.disable();
      this.gradesForm.get(`gradeRec_${studentId}`)?.setValue(null);
    }
  }

  saveGrades(): void {
    const studentsWithGrades: Student[] = this.students().map((student) => {
      const existingGrades = student.grades || [];

      const newGrade = {
        subject: this.gradesForm.value.subject,
        bimester: this.gradesForm.value.bimester,
        gradeP1: this.gradesForm.get(`gradeP1_${student.id}`)?.value,
        gradeP2: this.gradesForm.get(`gradeP2_${student.id}`)?.value,
        gradeRec: this.gradesForm.get(`gradeRec_${student.id}`)?.value,
        average: this.gradesForm.get(`average_${student.id}`)?.value,
      };

      return {
        ...student,
        grades: [...existingGrades, newGrade],
      };
    });

    this.studentStore.saveGrades(studentsWithGrades);
  }

}
