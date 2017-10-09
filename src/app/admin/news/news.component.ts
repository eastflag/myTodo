import {Component, OnInit} from "@angular/core";
import {NewsVO} from "../../domain/news.vo";
import {AdminService} from "../admin.service";
import {PageVO} from "../../domain/page.vo";

@Component({
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.scss']
})
export class NewsComponent implements OnInit {

  newsList: Array<NewsVO>;

  page: PageVO = new PageVO(0, 5, 0, [5, 15, 30, 60, 90]);

  constructor(private adminService: AdminService) {

  }

  ngOnInit(): void {
    this.getNewsList();
  }

  getNewsList() {
    let params = {
      start_index: this.page.pageIndex * this.page.pageSize,
      page_size: this.page.pageSize
    };
    this.adminService.findNews(params)
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

  }
}
