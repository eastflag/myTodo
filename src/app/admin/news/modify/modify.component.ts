import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterState} from "@angular/router";
import {AdminService} from "../../admin.service";
import {NewsVO} from "../../../domain/news.vo";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  news_id: number;
  news: NewsVO = new NewsVO();

  constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router,
              private snackBar: MdSnackBar) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let news_id = +params['news_id'];
      this.adminService.findOneNews(news_id)
        .then(res => {
          this.news = res;
        });
    });
  }

  modifyNews() {
    this.adminService.modifyNews(this.news)
      .then(res => {
        if (res.result === 0) {
          this.router.navigate(['../..'], {relativeTo: this.route});
          this.snackBar.open('수정하였습니다.', null, {
            duration: 3000,
          });
        }
      });
  }
}
