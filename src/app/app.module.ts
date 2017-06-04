import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HomeComponent} from "./home/home.component";
import {AppRoutingModule} from "./app-routing";
import {BootstrapComponent} from "./bootstrap/bootstrap.component";
import {JqueryComponent} from "./jquery/jquery.component";
import {AngularComponent} from "./angular/angular.component";
import {HttpComponent} from "./http/http.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, BootstrapComponent, JqueryComponent, AngularComponent, HttpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
