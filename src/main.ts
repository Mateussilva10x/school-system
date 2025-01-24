import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { GradesComponent } from './app/components/grades/grades.component';
import { StudentsComponent } from './app/components/students/students.component';
import { TeachersComponent } from './app/components/teachers/teachers.component';
import { MaterialModule } from './app/material.module';
import { ClassesComponent } from './app/components/classes/classes.component';
import { ClassDiaryComponent } from './app/components/class-diary/class-diary.component';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'grades', component: GradesComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'class-diary', component: ClassDiaryComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(MaterialModule, BrowserAnimationsModule, HttpClientModule),
  ],
}).catch((err) => console.error(err));
