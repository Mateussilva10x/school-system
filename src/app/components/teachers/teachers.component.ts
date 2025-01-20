import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Teacher {
  id: number;
  name: string;
  subject: string;
}

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'subject', 'actions'];
  dataSource = new MatTableDataSource<Teacher>([
    { id: 1, name: 'Ana Paula', subject: 'Matemática' },
    { id: 2, name: 'Roberto Lima', subject: 'História' },
    { id: 3, name: 'Juliana Alves', subject: 'Química' },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editTeacher(teacherId: number): void {
    alert(`Edição de professor com ID: ${teacherId}`);
  }
}
