import { Component, OnInit } from '@angular/core';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { CommonModule } from '@angular/common';
import { FavoriteServiceService } from '../../services/favorite-service.service';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [MovieItemComponent,CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {
  films: any[];

  constructor(private favoriteService : FavoriteServiceService) {
    this.films = [];
  }

  ngOnInit(): void {
    this.favoriteService.getFavoriteFilms().subscribe(
      films => {
        this.films = films; // Assign the films to the component property
        console.log('Favorite :', this.films); // Optionally log films
      },
      error => {
        console.error('Error', error);
      }
    );
  }


// searchMovie(){
//   console.log(this.searchValue);
//   this.movies=[]
//   this.movieService.searchMovies(this.searchValue).subscribe((data)=> {
//     console.log(data.results);
//     this.movies=data.results
//   })

// }
  // getMovies(){
  //   this.movieService.getPopularMovies().subscribe((data) =>{
  //     this.movies = data.results;
  //     console.log(this.movies);
  //     console.log("hi there ")
  //   } );
  // }
}
