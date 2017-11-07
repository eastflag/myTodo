import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../admin.service";
import {NewsVO} from "../../../domain/news.vo";
import {MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";
import {ConfirmDialogComponent} from "../../../shared/dialog/confirm.dialog.component";
import {PlatformLocation} from "@angular/common";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  news: NewsVO;

  dialogRef: MatDialogRef<any>;

  constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router,
              private snackBar: MatSnackBar, private dialog: MatDialog, private location: PlatformLocation) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let news_id = +params['news_id'];
      this.adminService.findOneNews(news_id)
        .then((res: NewsVO) => {
          this.news = res;
        });
    });
  }

  confirmDelete(news: NewsVO) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: '삭제하시겠습니까?'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) { // 삭제하기
        this.adminService.removeNews(news.news_id)
          .then(value => {
            if (value['result'] === 0) {
              this.snackBar.open('삭제하였습니다.', null, {
                duration: 3000,
              });
              this.router.navigate(['../..'], {relativeTo: this.route});
            }
          });
      }
    });
  }

  gotoModify() {
    let path = this.location.pathname;
    this.router.navigateByUrl(path.replace('view', 'modify'));
  }
}
