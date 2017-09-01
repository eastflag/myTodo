import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {NewsComponent} from "./news/news.component";

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'news', component: NewsComponent}
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}
