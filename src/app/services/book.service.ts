// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  searchBooks(query: string, page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('q', query)
      .set('startIndex', ((page - 1) * pageSize).toString())
      .set('maxResults', pageSize.toString());

    return this.http.get(this.baseUrl, { params });
  }

  getBookDetails(bookId: string): Observable<any> {
    const apiUrl = `${this.baseUrl}/${bookId}`;
    return this.http.get(apiUrl);
  }
}
