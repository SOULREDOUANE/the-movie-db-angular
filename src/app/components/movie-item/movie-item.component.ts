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
      const index = this.favoriteService.favoriteMovies.indexOf(this.movie);
      this.isFavorite=this.movie.isFavorite;
      console.log(this.isFavorite)

    } else {
      console.log(this.movie)
        this.favoriteService.favoriteMovies.push(this.movie);
        this.movie.isFavorite = !this.movie.isFavorite;
        this.isFavorite=this.movie.isFavorite;
        console.log(this.isFavorite)
    }

  }
}
