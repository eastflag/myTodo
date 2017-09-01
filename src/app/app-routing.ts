import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {JqueryComponent} from "./jquery/jquery.component";
import {AngularComponent} from "./angular/angular.component";
import {HttpComponent} from "./http/http.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'jquery', component: JqueryComponent},
  { path: 'angular', component: AngularComponent},
  { path: 'http', component: HttpComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
