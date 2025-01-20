import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Class {
  id: number;
  name: string;
  studentsCount: number;
}

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'studentsCount', 'actions'];
  dataSource = new MatTableDataSource<Class>([
    { id: 1, name: 'Turma A', studentsCount: 30 },
    { id: 2, name: 'Turma B', studentsCount: 25 },
    { id: 3, name: 'Turma C', studentsCount: 20 },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  viewClassDetails(classId: number): void {
    alert(`Detalhes da turma com ID: ${classId}`);
  }
}
