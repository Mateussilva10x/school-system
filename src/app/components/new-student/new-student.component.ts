import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export interface StudentFormData {
  name?: string;
  age?: number;
  class?: string;
  year?: number;
}

@Component({
  selector: 'app-new-student',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.scss'
})
export class NewStudentComponent {
  studentForm: FormGroup;

  turmas = ['6º ano', '7º ano', '8º ano', '9º ano'];
  years = [new Date().getFullYear(), new Date().getFullYear() + 1];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewStudentComponent>
  ) {
    this.studentForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(50)],
      ],
      age: [
        null,
        [Validators.required, Validators.min(10), Validators.max(20)],
      ],
      class: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  get name() {
    return this.studentForm.get('name');
  }

  get age() {
    return this.studentForm.get('age');
  }

  get class() {
    return this.studentForm.get('class');
  }

  get year() {
    return this.studentForm.get('year');
  }

  save(): void {
    if (this.studentForm.valid) {
      this.dialogRef.close(this.studentForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
