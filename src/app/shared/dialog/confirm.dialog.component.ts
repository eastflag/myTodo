import {Component, Inject} from "@angular/core";
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";

@Component({
  templateUrl: './confirm.dialog.component.html',
})
export class ConfirmDialogComponent {
  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialogRef: MdDialogRef<any>) { }
}
