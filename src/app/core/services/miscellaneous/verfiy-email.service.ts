import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerfiyEmailService {

  private BASE_URL = 'http://10.0.0.4:8080'; // change this later
  private VERIFY_EMAIL_URL = `${this.BASE_URL}/users/verification`;


  constructor(private http: HttpClient) { }

  verifyEmail(verifyData): Observable<any> {
    console.log(verifyData);
    return this.http.post<any>(this.VERIFY_EMAIL_URL, verifyData)
      .pipe(map(response => {
          console.log('Response from Spring' + response);
          console.log(response);
          if (response.successCode === 1) {
            return {success: true, message: 'Verification Success'};
          } else {
            return {success: false, message: 'Verification Failed'};
          }
        }), catchError (error => of({success: false, message: 'Verification Failed'}) )

      );
  }
}
