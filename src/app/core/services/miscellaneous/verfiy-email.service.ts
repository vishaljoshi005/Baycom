import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Env} from '@/core/env';

@Injectable({
  providedIn: 'root'
})
export class VerfiyEmailService {

  private BASE_URL = Env.BASE_URL; // change this later
  private VERIFY_EMAIL_URL = `${this.BASE_URL}/users/verification`;


  constructor(private http: HttpClient) { }

  verifyEmail(verifyData): Observable<any> {
    console.log(verifyData);
    return this.http.post<any>(this.VERIFY_EMAIL_URL, verifyData)
      .pipe(map(response => {
          if (response.success) {
            console.log('Response from Spring' + response);
            console.log(response);
            return {success: true, message: 'Verification Success'};
          } else {
            return {success: false, message: 'Verification Failed'};
          }
        }), catchError (error => of({success: false, message: 'Verification Failed'}) )

      );
  }
}
