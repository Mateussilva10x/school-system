import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewSummaryComponent } from '../new-summary/new-summary.component';
import { ClassDiaryStore } from '../../stores/class-diary.store';
import { MAT_DATE_LOCALE, MatNativeDateModule, NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-class-diary',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, NativeDateModule],
  templateUrl: './class-diary.component.html',
  styleUrl: './class-diary.component.scss',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class ClassDiaryComponent implements OnInit {
  filterForm!: FormGroup;
  summaries: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private classDiaryStore: ClassDiaryStore
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      year: [2024, Validators.required],
      schoolClass: ['6 ano', Validators.required],
      subject: ['Matemática', Validators.required],
      date: [null],
    });

    this.updateFilters();
  }

  updateFilters(): void {
    const filters = this.filterForm.value;
    this.classDiaryStore.fetchSummaries(filters).subscribe((res) => {
      this.summaries = res;
    });
  }

  openNewSummaryModal(): void {
    const dialogRef = this.dialog.open(NewSummaryComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateFilters();
      }
    });
  }
}
