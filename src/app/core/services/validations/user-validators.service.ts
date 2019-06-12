import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserValidatorsService {

  constructor() { }
  isAlterEgoTaken(alterEgo: string): Observable<boolean> {
    const isTaken = true;

    return of(isTaken).pipe(delay(400));
  }
}
