import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {BootstrapComponent} from "./bootstrap/bootstrap.component";
import {JqueryComponent} from "./jquery/jquery.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'bootstrap', component: BootstrapComponent},
  { path: 'jquery', component: JqueryComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
