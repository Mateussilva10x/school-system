import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassDiaryStore {
  private mockSummaries = [
    {
      id: 1,
      year: 2025,
      schoolClass: '6 ano',
      subject: 'Matemática',
      date: new Date('2025-01-27'),
      summary: 'Resumo da aula de introdução à álgebra.',
    },
    {
      id: 2,
      year: 2025,
      schoolClass: '7 ano',
      subject: 'Português',
      date: new Date('2025-01-27'),
      summary: 'Revisão sobre análise sintática.',
    },
  ];
  constructor(private http: HttpClient) {}

  fetchSummaries(filters: any): Observable<any[]> {
    const { year, schoolClass, subject, date } = filters;
    const filteredSummaries = this.mockSummaries.filter((summary) => {
      const matchesYear = summary.year === year;
      const matchesClass = summary.schoolClass === schoolClass;
      const matchesSubject = summary.subject === subject;
      const matchesDate = date ? summary.date.toISOString().slice(0, 10) === date.toISOString().slice(0, 10) : true;

      return matchesYear && matchesClass && matchesSubject && matchesDate;
    });

    return of(filteredSummaries);
  }

  addSummary(newSummary: any): Observable<any> {
    const id = this.mockSummaries.length + 1;
    this.mockSummaries.push({ id, ...newSummary });
    return of({ success: true });
  }
}
