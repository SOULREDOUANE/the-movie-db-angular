import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarSearchComponent } from './components/navbar-search/navbar-search.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { CommentaireItemComponent } from './components/commentaire-item/commentaire-item.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,
     MovieItemComponent,HomePageComponent,
     NavbarSearchComponent, CommentaireItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-app';
}
