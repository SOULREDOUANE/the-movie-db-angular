import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-navbar-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './navbar-search.component.html',
  styleUrl: './navbar-search.component.css'
})
export class NavbarSearchComponent {

  searchValue=new FormControl('');

  constructor(private homepage : HomePageComponent){}


  searchMovie(){
    this.homepage.movies=[]
    console.log("hi there how  ")
    console.log(this.homepage.movies)
  }
}
