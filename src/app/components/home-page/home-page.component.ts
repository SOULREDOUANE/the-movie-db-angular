import { Component, Injectable, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Movie } from '../../modules/movie';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {AuthenticationService} from "../../services/authentification.service";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MovieItemComponent,CommonModule,FormsModule,RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

@Injectable({
  providedIn: 'root'
})
export class HomePageComponent implements OnInit {

  username: string = AuthenticationService.getUser();
  constructor(private movieService : ServiceService){}
  searchValue!:string;
  movies!:Movie[]


  ngOnInit(): void {
    this.getMovies();
  }






  searchMovie() {
    console.log(this.searchValue);
    this.movies = [];

    this.movieService.searchMovies(this.searchValue).subscribe((data) => {
      this.movies = data.results.map((movie: Movie) => ({ ...movie, isFavorite: false }));
    });
  }

    getMovies(){
      this.movieService.getPopularMovies().subscribe((data) =>{
        this.movies = data.results;
        this.movies = data.results.map((movie: Movie) => ({ ...movie, isFavorite: false }));
        console.log(this.movies);
      } );
    }
}
