import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentification.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private auth: AuthenticationService = AuthenticationService.getInstance(this.router, this.http);
  constructor(private router: Router, private http: HttpClient) {
  }


  logInButton (username: string, password:string)  {
    this.auth.logIn(username, password);
  }
}
