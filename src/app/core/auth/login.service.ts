import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private BASE_URL = 'http://10.0.0.5:8080';
  private LOGIN_URL = `${this.BASE_URL}/login`;
  constructor(private http: HttpClient) { }

  login(logindata): Observable<any> {
    return this.http.post(this.LOGIN_URL, logindata , { observe: 'response' });
  }
}
