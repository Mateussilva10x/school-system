import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassDiaryStore {
  constructor(private http: HttpClient) {}

  fetchSummaries(filters: any): Observable<any[]> {
    const { year, schoolClass, subject, date } = filters;
    let query = `year=${year}&schoolClass=${schoolClass}&subject=${subject}`;
    if (date) query += `&date=${date.toISOString()}`;

    return this.http.get<any[]>(`/api/class-diary?${query}`);
  }

  addSummary(summary: any): Observable<any> {
    return this.http.post('/api/class-diary', summary);
  }
}
