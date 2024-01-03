import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router, UrlTree} from "@angular/router";
import { Observable } from "rxjs";
import {environment} from "../../environments/environment";



export interface Credentials {
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static instance: AuthenticationService;
  private static router: Router;
  private static http: HttpClient;
  //private url: string = environment.API_BASE_URL;
  private url: string = "http://localhost:8081";

  constructor(r: Router, h: HttpClient) {
    AuthenticationService.http = h;
    AuthenticationService.router = r;
  }


  public static getInstance(router: Router, http: HttpClient): AuthenticationService {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService(router, http);
    }
    return AuthenticationService.instance;
  }

  authenticate(credentials: Credentials): void {
    AuthenticationService.http.post(`${this.url}/register/login`, credentials)
      .subscribe((response: any) => {
        if (response && response.success) {
          alert(1)
          localStorage.setItem('Auth', 'true')
          localStorage.setItem('username', credentials.username)
          AuthenticationService.router.navigate(['/']);
        } else {
          this.logout()
        }
      });
  }

  logout() {
    localStorage.setItem('Auth', 'false')
    localStorage.setItem('username', '')
  }

  logIn(username: string, password: string): boolean {
    const cre : Credentials = {
      username: username,
      password: password
    }
    this.authenticate(cre);
    return AuthenticationService.isAuthenticated();
  }

  signUp(username: string, password: string) {

    const credentials = { username, password };
    const signUpUrl = `${this.url}/register`;
    AuthenticationService.router.navigate(['/auth/login']).then(r => true);
    return AuthenticationService.http.post(signUpUrl, credentials).subscribe(
      (response) => {
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  public static canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }

  public static isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      return localStorage.getItem('Auth') === 'true';
    }
    return false;
  }

  public static getUser(): string {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      const storedUsername = localStorage.getItem('username');
      return storedUsername ? String(storedUsername) : '';
    } else {
      return '';
    }
  }
}
