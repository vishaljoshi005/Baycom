import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Env} from '@/core/env';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private BASE_URL = Env.BASE_URL; // change this later
  private FORGOT_PASSWORD_URL = `${this.BASE_URL}/users/forgot-password`;
  private FORGOT_CHECKTOKEN_URL = `${this.BASE_URL}/users/checktoken`;
  private RESET_PASSWORD_URL = `${this.BASE_URL}/users/reset-password`;

  constructor(private http: HttpClient) { }

  forgotPassword(forgotData): Observable<any> {
    console.log(forgotData);
    return this.http.post<any>(this.FORGOT_PASSWORD_URL, forgotData)
      .pipe(map(response => {
          if (response.success) {
            console.log('Response from Spring' + response);
            console.log(response);
            return {success: true, message: ' Forgot Success'};
          } else {
            console.log(response);
            return {success: false, message: 'Forgot Failed'};
          }
        }), catchError (error => of({success: false, message: 'Forgot Failed'}) )

      );
  }

  checkToken(token): Observable<any> {
    console.log(token);
    return this.http.post<any>(this.FORGOT_CHECKTOKEN_URL, token)
      .pipe(map(response => {

          if (response.success) {
            console.log('Response from Spring' + response);
            console.log(response);
            return {success: true, message: ' Forgot Success'};
          } else {
            return {success: false, message: 'Forgot Failed'};
          }
        }), catchError (error => of({success: false, message: 'Forgot Failed'}) )

      );
  }

  resetPassword(resetData): Observable<any> {
    console.log(resetData);
    return this.http.put<any>(this.RESET_PASSWORD_URL, resetData)
      .pipe(map(response => {

          if (response.success) {
            console.log('Response from Spring' + response);
            console.log(response);
            return {success: true, message: ' Reset Success'};
          } else {
            return {success: false, message: 'Reset Failed'};
          }
        }), catchError (error => of({success: false, message: 'Reset Failed'}) )

      );
  }
}
