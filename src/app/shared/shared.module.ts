import {NgModule} from "@angular/core";
import {
  MdButtonModule, MdCardModule, MdCheckboxModule,
  MdDatepickerModule,
  MdDialogModule, MdExpansionModule, MdFormFieldModule, MdGridListModule, MdIconModule, MdInputModule, MdListModule,
  MdMenuModule,
  MdNativeDateModule, MdPaginatorModule, MdProgressBarModule, MdProgressSpinnerModule, MdRadioModule, MdRippleModule,
  MdSelectModule, MdSidenavModule, MdSliderModule, MdSlideToggleModule, MdSnackBarModule, MdTabsModule, MdToolbarModule,
  MdTooltipModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CKEditorModule} from "ng2-ckeditor";

@NgModule({
  declarations: [

  ],
  imports: [
    // ckeditor
    CKEditorModule,
    // flex layout
    FlexLayoutModule,
    // Material
    MdPaginatorModule,
    MdFormFieldModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
  ],
  exports: [
    // ckeditor
    CKEditorModule,
    // flex layout
    FlexLayoutModule,
    // Material
    MdPaginatorModule,
    MdFormFieldModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
  ],

})
export class SharedModule {

}
