import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing";
import {NewsComponent} from "./news/news.component";
import {MdCardModule, MdToolbarModule} from "@angular/material";

@NgModule({
  declarations: [
    AdminComponent,
    NewsComponent,
  ],
  imports: [
    AdminRoutingModule,
    MdToolbarModule,
    MdCardModule,
  ],
  exports: []
})
export class AdminModule {

}
