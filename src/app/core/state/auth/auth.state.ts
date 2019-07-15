import {AuthStateModel} from '@/core/models/authStateModel';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AuthService} from '@/core/services/auth/auth.service';
import {catchError, tap} from 'rxjs/operators';
import {Login, Logout} from '@/core/state/auth/auth.action';
import {of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {NgZone} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@State<AuthStateModel>( {
  name: 'auth'
} )

export class AuthState {

  @Selector()
  static token(state: AuthStateModel) { return state.token; }

  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone, private snackBar: MatSnackBar) {}
  @Action(Login)
  login({  setState, getState, dispatch }: StateContext<AuthStateModel>, { payload }: Login) {
    return this.authService.login(payload).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
      token: result.token,
        username: payload.username
      });
      this.navigate(['/dashboard']);
    }), catchError((err => { // this.openSnackBar();
                             return throwError(err) ; })));
  }

  @Action(Logout)
  logout({ setState, getState }: StateContext<AuthStateModel>) {
    const { token } = getState();
    return this.authService.logoutOne(token).pipe(tap(() => {
      setState( {token: null, username : null, userStatus: false } );
    }));
  }

  public navigate(commands: any[]): void {
    this.ngZone.run(() => this.router.navigate(commands)).then();
  }

  openSnackBar() {
    this.snackBar.open('Invalid Username or Password', 'Close', {
      duration: 2000,
      panelClass: ['style-success'],
    });
  }

}
