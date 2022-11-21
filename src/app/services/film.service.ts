import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { IFeedback, IFilm } from '../interfaces/film';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private readonly baseUrl = 'http://localhost:3000/films';

  constructor(
    private http: HttpClient,
    private feedback: FeedbackService
  ) { }

  public getAllFilms(): Observable<IFilm[]> {
    return this.http.get<IFilm[]>(this.baseUrl).pipe(shareReplay(1));
  }

  public getFilmWithoutRating(): Observable<IFilm[]> {
    const url = `${this.baseUrl}?viewing_like=false`;

    return this.http.get<IFilm[]>(url);
  }

  public getFilmByID(id: number) {
    const url = `${this.baseUrl}/${String(id)}`;
    return this.http.get<IFilm>(url);
  }

  public addFilm(film: IFilm): any {
    const url = `${this.baseUrl}`;
    console.log (film)

    return this.http.post<IFilm>(url, {...film});
  }

  public updateFilm(film: IFilm): Observable<IFilm> {
    return this.http.patch<IFilm>(`${this.baseUrl}/${film.id}`, film);
  }

  public updateFilmFeedback(film: IFilm, userId: number, feedback: Partial<IFeedback>): Observable<IFilm> {
    return this.feedback.updateFilmFeedback(film, userId, feedback).pipe(
      switchMap(() => {
        return this.feedback.getFilmFeedback(film.id);
      }),
      map((feedback) => ({ ...film, feedback }))
    );
  }
}
