import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

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

  private diaryEntriesSubject = new BehaviorSubject<ClassDiaryEntry[]>([]);
  diaryEntries$: Observable<ClassDiaryEntry[]> = this.diaryEntriesSubject.asObservable();


  displayedColumns = ['day', 'class', 'subject', 'notes'];

  get diaryEntries(): ClassDiaryEntry[] {
    return this.diaryEntriesSubject.getValue();
  }

  onFilterChange(): void {
    this.currentEntry = {
      day: this.selectedDay ?? '',
      class: this.selectedClass ?? '',
      subject: this.selectedSubject ?? '',
      notes: '',
    };
  }

  saveEntry(): void {
    if (
      this.selectedDay &&
      this.selectedClass &&
      this.selectedSubject &&
      this.currentEntry.notes
    ) {
      const newEntry: ClassDiaryEntry = {
        day: this.selectedDay,
        class: this.selectedClass,
        subject: this.selectedSubject,
        notes: this.currentEntry.notes,
      };

      const updatedEntries = [...this.diaryEntries, newEntry];
      this.diaryEntriesSubject.next(updatedEntries);

      alert('Diário salvo com sucesso!');
      this.currentEntry.notes = '';
    } else {
      alert('Por favor, preencha todas as informações antes de salvar.');
    }
  }
}
