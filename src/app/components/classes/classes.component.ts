import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { Class } from '../../models/class';
import { ClassService } from '../../services/class.service';
import { NewClassComponent } from '../new-class/new-class.component';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent implements OnInit {
  classrooms: Class[] = [];

  constructor(private classService: ClassService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.classService.getClassrooms().subscribe((classes) => {
      this.classrooms = classes.map((cls) => ({
        ...cls,
        totalStudents: this.classService.getTotalStudents(cls.id),
      }));
    });
  }

  openClassForm(): void {
    const dialogRef = this.dialog.open(NewClassComponent, { width: '600px' });

    dialogRef.afterClosed().subscribe((result: Class | undefined) => {
      if (result) {
        this.classService.addClassroom(result).subscribe(() => this.loadClasses());
      }
    });
  }
}
