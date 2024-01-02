import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import {LoginComponent} from "./components/authentification/login/login.component";
import {SignupComponent} from "./components/authentification/signup/signup.component";

export const routes: Routes = [
  {path: "", component:HomePageComponent},
  {path: "details/:id", component: MovieDetailsComponent},
  {path: "auth/login", component: LoginComponent},
  {path: "auth/signup", component: SignupComponent},
  {path: "favorites", component:FavoriteComponent},
  {path: "**" , component: HomePageComponent},


];
