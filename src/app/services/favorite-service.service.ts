import { MovieBackend } from './../modules/movie-backend';
import { Observable, catchError, of } from 'rxjs';
import { Movie } from './../modules/movie';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from './service.service';
import { Injectable, ɵisEnvironmentProviders } from '@angular/core';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class FavoriteServiceService {
  BACKEND_API:string = environment.API_BASE_URL
  constructor(private serviceService:ServiceService ,private http: HttpClient) { }

  favoriteMovies:Movie[]=[];

  getFavoriteMovies() : void {
    let backendMovies:MovieBackend[]=[];
    this.http.get<any>(`${this.BACKEND_API}/api/v1/movie/favorite`).subscribe(response => {
      backendMovies = response;
      for (let index = 0; index < backendMovies.length; index++) {
        this.serviceService.getMoviesById(backendMovies[index].originalMovieId).subscribe(movie => {
          // movie=movie.isFavorite=backendMovies[index].isFavorite;
          this.favoriteMovies.push(movie);
          this.favoriteMovies[index].isFavorite=true;
        });
      }


    });
  }

  saveFavoriteMovie(movieBackend: MovieBackend): void {
    this.http.post<any>(`${this.BACKEND_API}/api/v1/movie/create`, movieBackend)
      .subscribe(
        (response) => {
          console.log('Movie saved successfully:', response);
          // Handle success if needed
        },
        (error) => {
          console.error('Failed to save movie:', error);
          // Handle error if needed
        }
      );
  }

  deleteMovie(id :number):void{
    this.http.delete<any>(`${this.BACKEND_API}/api/v1/movie/delete/${id}`);
  }

  updateMovie(id: number, movieBackend: MovieBackend): Observable<Movie> {
    console.log("I'm working");
    return this.http.put<Movie>(`${this.BACKEND_API}/api/v1/movie/update/${id}`, movieBackend)
      .pipe(
        catchError((error) => {
          console.error('Failed to update movie:', error);
          // Handle error as needed, for example, throw an error or return a default movie
          throw error;
        })
      );
  }



}
