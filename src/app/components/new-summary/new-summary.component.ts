import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { ClassDiaryStore } from '../../stores/class-diary.store';

@Component({
  selector: 'app-new-summary',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './new-summary.component.html',
  styleUrl: './new-summary.component.scss'
})
export class NewSummaryComponent {
  summaryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewSummaryComponent>,
    private classDiaryStore: ClassDiaryStore
  ) {
    this.summaryForm = this.fb.group({
      year: [2024, Validators.required],
      schoolClass: ['6 ano', Validators.required],
      subject: ['Matemática', Validators.required],
      date: [null, Validators.required],
      summary: ['', Validators.required],
    });
  }

  saveSummary(): void {
    if (this.summaryForm.valid) {
      this.classDiaryStore.addSummary(this.summaryForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }


}
