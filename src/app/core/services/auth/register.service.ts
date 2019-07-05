import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { RegisterModel} from '@/core/models';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private BASE_URL = 'http://10.0.0.4:8080'; // change this later
  private LOGIN_URL = `${this.BASE_URL}/login`;
  private SIGNUP_URL = `${this.BASE_URL}/users/sign-up`;

  constructor(private http: HttpClient) { }

  register(registerdata: RegisterModel): Observable<any> {
    console.log(registerdata);
    return this.http.post<any>(this.SIGNUP_URL, registerdata )
      .pipe(map(response => {
        console.log(response);
        if (response.successCode === 1) {
          return {success: true, message: 'Registration Success'};
        } else {
          return {success: false, message: 'Registration Failed'};
        }
      }), catchError (error => of({success: false, message: 'Registration Failed'}) )
        );
  }
}
