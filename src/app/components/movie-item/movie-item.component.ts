import { MovieBackend } from './../../modules/movie-backend';
import { FavoriteServiceService } from './../../services/favorite-service.service';
import { Component, Input } from '@angular/core';
import { Movie } from '../../modules/movie';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css'
})
export class MovieItemComponent {
  isFavorite = false;

  constructor(private favoriteService:FavoriteServiceService){}

  @Input() movie!:Movie;


  toggleColor(event: Event) {
    event.preventDefault();

    if (this.movie.isFavorite) {
      this.movie.isFavorite = !this.movie.isFavorite;
      let movieBackend :MovieBackend = {
        originalMovieId: this.movie.id,
        name: this.movie.title,
        isFavorite: this.movie.isFavorite
      };
      console.log(this.movie.isFavorite)
      this.favoriteService.updateMovie(movieBackend.originalMovieId, movieBackend).subscribe(
        (updatedMovie) => {
          console.log('Movie updated successfully:', updatedMovie);
          // Handle success if needed
        },
        (error) => {
          console.error('Failed to update movie:', error);
          // Handle error if needed
        }
      );

    } else {
      console.log(this.movie)

        this.movie.isFavorite = !this.movie.isFavorite;

        let movieBackend :MovieBackend = {
          originalMovieId: this.movie.id,
          name: this.movie.title,
          isFavorite: this.movie.isFavorite
        };

      this.favoriteService.saveFavoriteMovie(movieBackend);
    }

  }
}
