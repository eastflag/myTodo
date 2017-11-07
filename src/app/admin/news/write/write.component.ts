import {Component, OnInit, ViewChild} from "@angular/core";
import {NewsVO} from "../../../domain/news.vo";
import {AdminService} from "../../admin.service";
import {MatSnackBar} from "@angular/material";
import {PlatformLocation} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  news: NewsVO = new NewsVO();

  fileList: FileList;
  thumbnailSrc;

  @ViewChild('newFile')
  newFile: any;

  constructor(private adminService: AdminService, private snackBar: MatSnackBar,
              private location: PlatformLocation, private router: Router) {

  }

  ngOnInit() {
    let path = this.location.pathname;
  }

  addNews() {
    if (!this.news.title) {
      this.snackBar.open('제목을 입력하세요.', null, {
        duration: 3000,
      });
      return;
    }
    this.adminService.addNews(this.news)
      .then(res => {
        if (res['result'] === 0) {
          this.router.navigateByUrl('/admin/news');
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
            this.news.content += `<img src="http://www.javabrain.kr${res['result']}">`;
          } else {
            this.news.content = `<img src="http://www.javabrain.kr${res['result']}">`;
          }
        }
      });
  }

}
