import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

interface ClassDiaryEntry {
  day: string;
  class: string;
  subject: string;
  notes: string;
}

@Component({
  selector: 'app-class-diary',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './class-diary.component.html',
  styleUrl: './class-diary.component.scss'
})
export class ClassDiaryComponent {

  weekdays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  classes = [
    { id: 'a', name: 'Turma A' },
    { id: 'b', name: 'Turma B' },
  ];
  subjects = [
    { id: 'math', name: 'Matemática' },
    { id: 'history', name: 'História' },
  ];

  selectedSubject: string | null = null;
  selectedClass: string | null = null;
  selectedDay: string | null = null;

  currentEntry: Partial<ClassDiaryEntry> = {};
  entries: ClassDiaryEntry[] = [];

  displayedColumns = ['day', 'class', 'subject', 'notes'];

  onFilterChange(): void {
    this.currentEntry = {
      day: this.selectedDay ?? '',
      class: this.selectedClass ?? '',
      subject: this.selectedSubject ?? '',
      notes: '',
    };
  }

  onDayChange(): void {
    this.onFilterChange();
  }

  saveEntry(): void {
    if (
      this.selectedDay &&
      this.selectedClass &&
      this.selectedSubject &&
      this.currentEntry.notes
    ) {
      this.entries.push({
        day: this.selectedDay,
        class: this.selectedClass,
        subject: this.selectedSubject,
        notes: this.currentEntry.notes,
      });
      alert('Diário salvo com sucesso!');
      this.currentEntry.notes = ''; // Limpa o campo de notas
    } else {
      alert('Por favor, preencha todas as informações antes de salvar.');
    }
  }
}
