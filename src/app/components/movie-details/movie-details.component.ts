import { FavoriteServiceService } from './../../services/favorite-service.service';
import { Comment } from './../../modules/commentaire';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../modules/movie';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute } from '@angular/router';
import { CommentaireItemComponent } from '../commentaire-item/commentaire-item.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AuthenticationService} from "../../services/authentification.service";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommentaireItemComponent,FormsModule,CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit{
  movie!: Movie;
  movieId!:number;
  comments : Comment[] = [];

  content!:string;
  public user: string = AuthenticationService.getUser();
  public isFavorited : boolean = false;

  constructor(private movieService :ServiceService ,private route: ActivatedRoute, public favS: FavoriteServiceService){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.movieId = id;
    });
    this.favS.estFavorise(this.user, this.movieId+'').then((isFavorited) => {
      this.isFavorited = isFavorited;
    }).catch((error) => {
      console.error('Error checking favoritism:', error);
    });
    this.getMovieDetails()

  }


  getMovieDetails(){
    this.movieService.getMoviesById(this.movieId).subscribe((data)=>{
      this.movie = data
      console.log(data)
    })
  }


  addComment() {
    const newComment: Comment = {
      user: this.user,
      content: this.content,
    };

    // Assuming 'comments' is an array where you want to store your comments


    // You may want to clear the user and content after adding a comment
    this.user = '';
    this.content = '';
  }

  public addFavorite(username: string, filmId: string) {
    this.favS.sendFavorite(username, filmId).subscribe(
      res => {
        this.isFavorited = true;
        console.log(res)
      },
      error => {

      }
    )
  }

  public deleteFavorite(username: string, filmId: string) {
    this.favS.deleteFavorite(username, filmId).subscribe(
      res => {
        this.isFavorited = false;
        console.log(res)
      },
      error => {

      }
    )

  }
}
