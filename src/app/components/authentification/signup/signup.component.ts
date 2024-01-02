import { Component } from '@angular/core';
import {AuthenticationService} from "../../../services/authentification.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  private auth: AuthenticationService = AuthenticationService.getInstance(this.router, this.http);
  constructor(private router: Router, private http: HttpClient) {
  }


  sighUpButton (username: string, password:string)  {
    this.auth.signUp(username, password);
  }

}
