import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NewStudentComponent, StudentFormData } from '../new-student/new-student.component';
import { ConfirmDialogData, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Student } from '../../interfaces/student';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent{
  currentYear = new Date().getFullYear();
  years: number[] = [this.currentYear, this.currentYear + 1];
  turmas: string[] = ['6º ano', '7º ano', '8º ano', '9º ano'];

  selectedYear: number = this.currentYear;
  selectedClass: string = '6º ano';

  students: Student[] = [];
  filteredStudents: Student[] = [];

  constructor(private dialog: MatDialog) {}

  applyFilters(): void {
    this.filteredStudents = this.students.filter(
      (student) =>
        student.year === this.selectedYear && student.class === this.selectedClass
    );
  }

  openStudentForm(): void {
    const dialogRef = this.dialog.open(NewStudentComponent, {
      width: '400px',
      data: { year: this.selectedYear, class: this.selectedClass } as StudentFormData,
    });

    dialogRef.afterClosed().subscribe((result: StudentFormData | undefined) => {
      if (result && result.name && result.age && result.class && result.year) {
        this.students.push(result as Student);
        this.applyFilters();
        alert('Aluno adicionado com sucesso!');
      }
    });
  }

  generateReport(student: Student): void {
    const dialogData: ConfirmDialogData = {
      title: 'Gerar Boletim',
      message: `Deseja realmente gerar o boletim para o aluno ${student.name}?`,
      confirmText: 'Sim, Gerar',
      cancelText: 'Cancelar',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        alert(`Boletim gerado para ${student.name}!`);
      }
    });
  }
}
