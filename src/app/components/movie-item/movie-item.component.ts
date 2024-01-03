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
  constructor(private favoriteService:FavoriteServiceService){}

  @Input() movie!:Movie;
}
