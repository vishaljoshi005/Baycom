import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  PB_DIRECTION,
  POSITION,
  SPINNER
} from 'ngx-ui-loader';

import {SharedModule} from './shared/shared.module';


import {ForgotPasswordComponent, LoginComponent} from './components/login/login.component';


import {AuthService} from '@/core/services/auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import {CoreModule} from '@/core/core.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {NgxsModule} from '@ngxs/store';

import {environment} from '../environments/environment';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#FF4500',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.squareJellyBox, // background spinner type
  fgsType: SPINNER.threeStrings, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule,
    NgxUiLoaderRouterModule,



    CoreModule,
    SharedModule
  ],
  entryComponents: [
    ForgotPasswordComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose: true, } },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
