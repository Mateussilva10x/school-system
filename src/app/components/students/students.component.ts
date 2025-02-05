import { Component, computed, OnInit, signal, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NewStudentComponent, StudentFormData } from '../new-student/new-student.component';
import { ConfirmDialogData, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  currentYear = new Date().getFullYear();
  years: number[] = [this.currentYear, this.currentYear + 1];
  turmas: { id: string; name: string }[] = [
    { id: '101', name: '6º Ano' },
    { id: '102', name: '7º Ano' },
    { id: '103', name: '8º Ano' },
    { id: '104', name: '9º Ano' },
  ];

  selectedYear = signal<number>(this.currentYear);
  selectedClassId = signal<string>('101');

  students = signal<Student[]>([]);
  filteredStudents = computed(() =>
    this.students().filter(
      (student) =>
        student.classId === this.selectedClassId() &&
        this.getYearFromStudent(student) === this.selectedYear()
    )
  );

  constructor(private studentService: StudentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    const filters = { schoolYear: this.selectedYear(), classId: this.selectedClassId() };

    this.studentService.getStudents(filters ?? null).subscribe((data) => {
      this.students.set(data);
    });
  }

  openStudentForm(student?: Student): void {
    const dialogRef = this.dialog.open(NewStudentComponent, {
      width: '600px',
      data: student ? { ...student } : { schoolYear: this.selectedYear(), classId: this.selectedClassId() } as StudentFormData,
    });

    dialogRef.afterClosed().subscribe((result: StudentFormData | undefined) => {
      if (result) {
        if (student) {
          this.studentService.updateStudent(student.id, result as Student).subscribe(() => this.loadStudents());
        } else {
          this.studentService.addStudent(result as Student).subscribe(() => this.loadStudents());
        }
      }
    });
  }

  deleteStudent(student: Student): void {
    const dialogData: ConfirmDialogData = {
      title: 'Deletar Aluno',
      message: `Tem certeza que deseja excluir o aluno ${student.name}?`,
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.studentService.deleteStudent(student.id).subscribe(() => this.loadStudents());
      }
    });
  }

  generateReport(student: Student): void {
    alert(`Boletim gerado para ${student.name}!`);
  }

  getYearFromStudent(student: Student): number {
    const yearMatch = student.classId.match(/_(\d{4})$/);
    return yearMatch ? parseInt(yearMatch[1]) : this.currentYear;
  }
}
