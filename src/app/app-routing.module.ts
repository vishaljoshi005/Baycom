import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {RegisterComponent} from '@/components/register/register.component';
import {VerifyEmailComponent} from '@/shared/components/verify-email/verify-email.component';
import {ResetPasswordComponent} from '@/shared/components/reset-password/reset-password.component';
import {DashboardComponent} from '@/components/dashboard/dashboard.component';
import {AuthGuard} from '@/core/guards';

const routes: Routes = [
  { path: 'login',        component: LoginComponent},
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }, // CHange to login
  { path: 'register',        component: RegisterComponent},
  { path: 'verify/:id/:token', component: VerifyEmailComponent},
  { path: 'reset/:id/:token', component: ResetPasswordComponent},
  { path: 'dashboard', component: DashboardComponent, }, // canActivate: [AuthGuard] add this here
  { path: 'page',        component: PageNotFoundComponent}, // to be changed with double asterisk cz wildcard
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
