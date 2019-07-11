import { Injectable } from '@angular/core';
import {Observable, of, throwError, timer} from 'rxjs';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {Env} from '@/core/env';

@Injectable({
  providedIn: 'root'
})
export class UserValidatorsService {

  private BASE_URL = Env.BASE_URL;
  private CHECK_EMAIL_URL = `${this.BASE_URL}/users/email/`;
  private CHECK_USER_NAME = `${this.BASE_URL}/users/username/` ;

  constructor(private http: HttpClient) { }

  searchEmail(email) {
    // debounce
    return timer(1000)
      .pipe(
        debounceTime(1000),
        switchMap(() => {
          return this.http.get<any>(`${this.CHECK_EMAIL_URL}${email}`);
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
            if (!res.success) {
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
          return this.http.get<any>(`${this.CHECK_USER_NAME}${username}`);
        }),
        catchError(() => null)
      );
  }

  userNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchUserName(control.value)
        .pipe(
          map(res => {
            if (!res.success) {
              return {userNameExists: true};
            } else {
              return null;
            }
          })
        );
    };

  }
}
