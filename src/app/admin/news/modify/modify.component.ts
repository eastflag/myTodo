import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../admin.service";
import {NewsVO} from "../../../domain/news.vo";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  news_id: number;
  news: NewsVO = new NewsVO();

  fileList: FileList;

  constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router,
              private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let news_id = +params['news_id'];
      this.adminService.findOneNews(news_id)
        .then((res: NewsVO) => {
          this.news = res;
        });
    });
  }

  modifyNews() {
    this.adminService.modifyNews(this.news)
      .then(res => {
        if (res['result'] === 0) {
          this.router.navigate(['../..'], {relativeTo: this.route});
          this.snackBar.open('수정하였습니다.', null, {
            duration: 3000,
          });
        }
      });
  }

  fileChange(event: any) {
    this.fileList = event.target.files;
    console.log(this.fileList);
    // show thumbnail
    let reader = new FileReader();
    reader.readAsDataURL((this.fileList[0]));
    reader.onload = () => {
      // this.thumbnailSrc = reader.result;
      this.imageUpload();
    };
  }

  imageUpload() {
    let formData: FormData = new FormData();

    if (this.fileList && this.fileList.length > 0) {
      let file: File = this.fileList[0];
      formData.append('file', file, file.name);
    }

    this.adminService.imageUpload(formData)
      .then(res => {
        if (res['result'] === 0) {
          // 입력폼 초기화
          // this.fileList[0] = null;
          // this.fileList = null;
          // this.thumbnailSrc = null;
          // this.newFile.nativeElement.value = ""; // input type file은 readonly

          // 이미지 경로를  editor에 추가한다.
          console.log(res['value']);
          if (this.news.content) {
            this.news.content += `<img src="http://www.javabrain.kr${res['value']}">`;
          } else {
            this.news.content = `<img src="http://www.javabrain.kr${res['value']}">`;
          }
        }
      });
  }
}
