import { Injectable } from '@angular/core';
import {Observable, of, throwError, timer} from 'rxjs';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserValidatorsService {

  private BASE_URL = 'http://10.0.0.4:8080'; // change this later

  constructor(private http: HttpClient) { }

  searchEmail(email) {
    // debounce
    return timer(1000)
      .pipe(
        debounceTime(1000),
        switchMap(() => {
          return this.http.get<any>(`${this.BASE_URL}/users/email/${email}`);
        }),
        catchError((error) => throwError(error))
      );
  }

  userEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchEmail(control.value)
        .pipe(
          map(res => {
            console.log(res);
            if (res.successCode === 0) {
              return {userEmailExists: true};
            } else {
            return null;
            }
          }),
          catchError(() => of(null))
        );
    };

  }

  searchUserName(username) {
    // debounce
    return timer(1000)
      .pipe(
        debounceTime(1000),
        switchMap(() => {
          return this.http.get<any>(`${this.BASE_URL}/users/username/${username}`);
        }),
        catchError(() => null)
      );
  }

  userNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchUserName(control.value)
        .pipe(
          map(res => {
            if (res.successCode === 0) {
              return {userNameExists: true};
            } else {
              return null;
            }
          })
        );
    };

  }
}
