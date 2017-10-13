import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HomeComponent} from "./home/home.component";
import {AppRoutingModule} from "./app-routing";
import {JqueryComponent} from "./jquery/jquery.component";
import {AngularComponent} from "./angular/angular.component";
import {HttpComponent} from "./http/http.component";
import {AppService} from "./app.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MyDatePipe} from "./shared/my.date.pipe";
import {HighlightDirective} from "./shared/highlight.directive";
import {IndexComponent} from "./index.component";
import { LoginComponent } from './auth/login/login.component';
import {AuthGuardService} from "./auth/auth-guard.service";
import {SharedModule} from "./shared/shared.module";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuth} from "angularfire2/auth";
import { RegisterComponent } from './auth/register/register.component';
import {environment} from "../environments/environment";


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent, JqueryComponent, AngularComponent, HttpComponent,
    MyDatePipe,
    HighlightDirective,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AppService, AuthGuardService, AngularFireAuth],
  bootstrap: [AppComponent],
})
export class AppModule { }
