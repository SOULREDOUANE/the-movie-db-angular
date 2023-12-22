import { environment } from './../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private readonly server :string =environment.API_BASE_URL
  constructor(private http :HttpClient) { }

  getStringText(): Observable<string> {
    const url = `${this.server}/test`; // Replace with your actual endpoint
    return  this.http.get(url, { responseType: 'text' });
  }
}
