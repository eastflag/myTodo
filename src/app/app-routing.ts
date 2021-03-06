import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {JqueryComponent} from "./jquery/jquery.component";
import {AngularComponent} from "./angular/angular.component";
import {HttpComponent} from "./http/http.component";
import {IndexComponent} from "./index.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {NewsComponent} from "./news/news.component";
import {ViewComponent} from "./news/view/view.component";

const routes: Routes = [
  { path: '', component: IndexComponent, children: [
    { path: '', component: HomeComponent},
    { path: 'jquery', component: JqueryComponent},
    { path: 'angular', component: AngularComponent},
    { path: 'http', component: HttpComponent},
    { path: 'news', component: NewsComponent, children: [
      { path: 'view/:news_id', component: ViewComponent},
    ]},

    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
  ]},

  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
