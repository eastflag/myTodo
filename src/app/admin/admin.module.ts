import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing";
import {NewsComponent} from "./news/news.component";
import {AdminService} from "./admin.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {SharedModule} from "../shared/shared.module";
import { ViewComponent } from './news/view/view.component';
import { WriteComponent } from './news/write/write.component';
import { ModifyComponent } from './news/modify/modify.component';

@NgModule({
  declarations: [
    AdminComponent,
    NewsComponent,
    ViewComponent,
    WriteComponent,
    ModifyComponent,
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
