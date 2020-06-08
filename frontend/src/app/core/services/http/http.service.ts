import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Mod } from 'src/app/shared/models/mod';
import { Category } from 'src/app/shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // Routes will have to be changed to target the backend, once in prod.
  private urls = {
    mods: 'http://localhost:3000/',
    mod: 'http://localhost:3000/mod/',
    categories: 'http://localhost:3000/categories'
  };

  constructor(private http: HttpClient) { }

  public getMods(): Observable<Mod[]> {
    return this.http.get<Mod[]>(this.urls.mods)
      .pipe(
        tap(_ => console.log("fetched mods data")),
        catchError(this.handleError('getMods', []))
      );
  }

  // might need fixing
  public getMod(id: number): Observable<Mod[]> {
    return this.http.get<Mod[]>(`${this.urls.mod}/${id}`)
      .pipe(
        tap(_ => console.log(`fetched mod with id:${id}`)),
        catchError(this.handleError('getMod', []))
      );
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.urls.categories)
      .pipe(
        tap(_ => console.log("fetched categories")),
        catchError(this.handleError('getCategories', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
