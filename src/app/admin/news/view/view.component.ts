import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../admin.service";
import {NewsVO} from "../../../domain/news.vo";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  news: NewsVO;

  constructor(private route: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let news_id = +params['news_id'];
      this.adminService.findOneNews(news_id)
        .then(res => {
          this.news = res;
        });
    });
  }

}
