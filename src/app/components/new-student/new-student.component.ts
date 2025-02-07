import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import moment from 'moment';

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
export class NewStudentComponent implements OnInit {
  readonly NOW = new Date();
  readonly minDefaultDate = new Date(1910, 1 ,1);
  studentForm!: FormGroup;
  years: number[] = [new Date().getFullYear(), new Date().getFullYear() + 1];
  turmas = [
    { id: '101', name: '6º Ano' },
    { id: '102', name: '7º Ano' },
    { id: '103', name: '8º Ano' },
    { id: '104', name: '9º Ano' },
  ];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<NewStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: [this.data?.name, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      birthDate: [moment(this.data?.birthDate).toDate(), Validators.required],
      classId: [this.data?.classId, Validators.required],
      schoolYear: [this.data?.schoolYear  , Validators.required],
    });
  }

  saveStudent(): void {
    if (this.studentForm.invalid) return;

    const studentData: Student = {
      id: this.data?.id || crypto.randomUUID(),
      ...this.studentForm.value,
    };

    if (this.data?.id) {
      this.studentService.updateStudent(studentData.id, studentData).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.studentService.addStudent(studentData).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
