import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

export const routes: Routes = [
  {path: "", component:HomePageComponent},
  {path: "details/:id", component: MovieDetailsComponent},
  {path: "favorites", component:FavoriteComponent},
  {path: "**" , component: HomePageComponent},


];
