import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {NewsVO} from "../domain/news.vo";
import {PageVO} from "../domain/page.vo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newsList: Array<NewsVO>;

  page: PageVO = new PageVO(0, 5, 0, [5, 15, 30, 60, 90]);

  constructor(private appService: AppService, private router: Router) {

  }

  ngOnInit(): void {
    this.getNewsList();
  }

  getNewsList() {
    let params = {
      start_index: this.page.pageIndex * this.page.pageSize,
      page_size: this.page.pageSize
    };
    this.appService.findNews(params)
      .then(res => {
        this.newsList = res.data;
        this.page.totalCount = res.total;
      });
  }

  pageChanged(event: any) {
    this.page.pageIndex = event.pageIndex;
    this.page.pageSize = event.pageSize;
    this.getNewsList();
  }

  gotoView(news: NewsVO) {
    this.router.navigateByUrl(`/news/view/${news.news_id}`);
  }
}
