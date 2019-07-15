import {AuthStateModel} from '@/core/models/authStateModel';

export class Login {
  static readonly type = '[Auth] Login Api';

  constructor(public payload: {username: string, password: string}) {}
}

export class Logout {
  static readonly type = '[Auth] Logout Api';
}
