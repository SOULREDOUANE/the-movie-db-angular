import { Comment } from './../../modules/commentaire';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../modules/movie';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute } from '@angular/router';
import { CommentaireItemComponent } from '../commentaire-item/commentaire-item.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  comments!:Comment[];

  content!:string;
  user:string="redouane soul";

  constructor(private movieService :ServiceService ,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Access the film.id parameter
      const id = params['id'];
      this.movieId=id;

      // Use the id as needed, for example, call your service method
      // this.getMoviedetails(this.filmId);
      this.comments = [
        {
          id: 1,
          user: 'John Doe',
          content: 'This is the first comment.',
        },
        {
          id: 2,
          user: 'Alice Smith',
          content: 'Nice work on the project!',
        },
        {
          id: 3,
          user: 'Bob Johnson',
          content: 'I have a question about the code.',
        },
        // Add more comments as needed
      ];


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
    // Assuming 'comments' is an array where you want to store your comments
    const newComment: Comment = {
      user: this.user,
      content: this.content,
    };

    // Assuming 'comments' is an array where you want to store your comments
    this.comments.push(newComment);

    // You may want to clear the user and content after adding a comment
    this.user = '';
    this.content = '';
  }
}
