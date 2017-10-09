import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing";
import {NewsComponent} from "./news/news.component";
import {MdCardModule, MdToolbarModule} from "@angular/material";
import {AdminService} from "./admin.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    AdminComponent,
    NewsComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    SharedModule,
  ],
  exports: [],
  providers: [AdminService]
})
export class AdminModule {

}
