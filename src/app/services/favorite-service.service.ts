import {Observable, map, mergeMap, forkJoin} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentification.service";
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class FavoriteServiceService {
  BACKEND_API:string = environment.API_BASE_URL
  //private BACKEND_API: string = 'http://localhost:8081';
  API_TOKEN: string = '834805b4c6cf9aff20541bd2213dce6d';
  base_url: string = 'https://api.themoviedb.org/3/';
  language: string = 'fr';

  constructor(private http: HttpClient) { }



  public getFavoriteFilms(): Observable<any[]> {
    return this.getFilmIds().pipe(
      mergeMap((ids: string[]) => {
        const movieRequests: Observable<any>[] = [];

        ids.forEach(id => {
          const url = `${this.base_url}movie/${id}?api_key=${this.API_TOKEN}&language=${this.language}`;
          movieRequests.push(this.http.get<any>(url));
        });

        return forkJoin(movieRequests);
      })
    );
  }


  public getFilmIds(): Observable<string[]> {
    const username = AuthenticationService.getUser();
    const endpoint = 'http://localhost:8081/favorite/${username}';

    return this.http.get<any[]>(endpoint).pipe(
      map((data: any[]) => {
        return data.map(item => item.filmId);
      })
    );
  }

  public estFavorise(username: string, filmId: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<any>('http://localhost:8081/favorite', { username, filmId })
        .subscribe(
          (response: any) => {
            if (response && response.success) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (error) => {
            reject(error);
          }
        );
    });
  }


  deleteFavorite(username: string, filmId: string): Observable<any> {
    return this.http.post<any>('http://localhost:8081/favorite/supprimer', { username, filmId });
  }

  sendFavorite(username: string, filmId: string): Observable<any> {
    return this.http.post<any>('http://localhost:8081/favorite/ajouter', { username, filmId });
  }



}
