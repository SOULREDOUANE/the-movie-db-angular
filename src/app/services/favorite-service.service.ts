import { Injectable } from '@angular/core';
import { Movie } from '../modules/movie';

@Injectable({
  providedIn: 'root'
})
export class FavoriteServiceService {

  constructor() { }

  favoriteMovies:Movie[]=[];

  getFavoriteMovies() : Movie[]{
    return this.favoriteMovies;
  }
}
