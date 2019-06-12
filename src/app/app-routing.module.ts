import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {RegisterComponent} from '@/components/register/register.component';

const routes: Routes = [
  { path: 'login',        component: LoginComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'register',        component: RegisterComponent},
  { path: 'page',        component: PageNotFoundComponent}, // to be changed with double asterisk cz wildcard
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
