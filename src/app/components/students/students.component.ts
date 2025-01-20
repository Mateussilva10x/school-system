import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface Student {
  id: number;
  name: string;
  class: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'class', 'actions'];
  dataSource = new MatTableDataSource<Student>([
    { id: 1, name: 'João Silva', class: '6º Ano' },
    { id: 2, name: 'Maria Oliveira', class: '7º Ano' },
    { id: 3, name: 'Carlos Souza', class: '8º Ano' },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  generateReport(studentId: number): void {
    alert(`Boletim gerado para o aluno com ID: ${studentId}`);
  }
}
