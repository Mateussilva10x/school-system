import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClassService } from '../../services/class.service';
import { Class } from '../../models/class';

@Component({
  selector: 'app-new-class',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './new-class.component.html',
  styleUrl: './new-class.component.scss'
})
export class NewClassComponent {
  classForm: FormGroup;
  years = [2024, 2025, 2026];

  constructor(
    private fb: FormBuilder,
    private classService: ClassService,
    private dialogRef: MatDialogRef<NewClassComponent>
  ) {
    this.classForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      schoolYear: [new Date().getFullYear(), Validators.required],
    });
  }

  saveClass(): void {
    if (this.classForm.invalid) return;

    const classData: Class = {
      id: crypto.randomUUID(),
      ...this.classForm.value,
    };

    this.classService.addClassroom(classData).subscribe(() => {
      this.dialogRef.close(classData);
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
