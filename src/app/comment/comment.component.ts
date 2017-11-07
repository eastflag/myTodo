import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommentVO} from "../domain/comment.vo";
import {MdDialog, MdDialogRef, MatSnackBar} from "@angular/material";
import {AppService} from "../app.service";
import {AuthGuardService} from "../auth/auth-guard.service";
import {PlatformLocation} from "@angular/common";
import {ConfirmDialogComponent} from "../shared/dialog/confirm.dialog.component";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnChanges {

  // 부모가 news_id값을 바꾸면 업데이트하기 위해서 OnChanges 를 오버라이딩 해야한다.
  @Input()
  news_id: number;
  commentList: Array<CommentVO >;

  newComment: CommentVO = new CommentVO();

  dialogRef: MdDialogRef<any>;

  constructor(private appService: AppService, private authGuard: AuthGuardService,
              private location: PlatformLocation, private snackBar: MatSnackBar, private dialog: MdDialog) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('news_id:' + this.news_id);
    this.getCommentList();
  }

  getCommentList() {
    this.appService.findComment(this.news_id)
      .then(res => this.commentList = res);
  }

  // textarea에 포커스가 오면 로그인을 체크한다. 완료시에 체크하면 입력된 내용을 저장했다 꺼내기가 번거롭다.
  checkLogin() {
    console.log('onfocus');
    // 로그인 체크
    this.authGuard.checkLogin(this.location.pathname);
  }

  saveComment() {
    if (!this.newComment.content) {
      this.snackBar.open('댓글을 입력하세요.', null, {
        duration: 3000,
      });
      return;
    }

    this.newComment.member_id = this.authGuard.getMember();
    this.newComment.news_id = this.news_id;

    console.log(this.newComment);
    this.appService.addComment(this.newComment)
      .then(res => {
        if (res.result === 0) {
          this.newComment.content = null;
          this.getCommentList();
        }
      });
  }

  confirmDelete(comment: CommentVO) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: '삭제하시겠습니까?'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) { // 삭제하기
        this.appService.removeComment(comment.comment_id)
          .then(value => {
            if (value.result === 0) {
              this.getCommentList();
            }
          });
      }
    });
  }

  getMemberId() {
    return this.authGuard.getMember();
  }

}
