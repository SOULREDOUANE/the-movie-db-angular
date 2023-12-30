import { Component, OnInit } from '@angular/core';
import { Movie } from '../../modules/movie';
import { ServiceService } from '../../services/service.service';
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
  constructor(private favoriteService : FavoriteServiceService){}
  ngOnInit(): void {
    this.favoriteService.getFavoriteMovies();
    this.movies=this.favoriteService.favoriteMovies;
  }
  // searchValue!:string;
  movies!:Movie[]








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
