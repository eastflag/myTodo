import {NgModule} from "@angular/core";
import {
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule,
  MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule,
  MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CKEditorModule} from "ng2-ckeditor";
import {ConfirmDialogComponent} from "./dialog/confirm.dialog.component";

@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    // ckeditor
    CKEditorModule,
    // flex layout
    FlexLayoutModule,
    // Material
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  exports: [
    // ckeditor
    CKEditorModule,
    // flex layout
    FlexLayoutModule,
    // Material
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,

    ConfirmDialogComponent,
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {

}
