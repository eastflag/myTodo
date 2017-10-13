import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {NewsComponent} from "./news/news.component";
import {ViewComponent} from "./news/view/view.component";
import {WriteComponent} from "./news/write/write.component";
import {ModifyComponent} from "./news/modify/modify.component";

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'news', component: NewsComponent, children: [
      {path: 'view/:news_id', component: ViewComponent},
      {path: 'modify/:news_id', component: ModifyComponent},
      {path: 'write', component: WriteComponent}
    ]}
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}
