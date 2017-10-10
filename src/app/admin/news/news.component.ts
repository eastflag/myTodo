import {Component, OnInit} from "@angular/core";
import {NewsVO} from "../../domain/news.vo";
import {AdminService} from "../admin.service";
import {PageVO} from "../../domain/page.vo";
import {NavigationStart, Router} from "@angular/router";

@Component({
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.scss']
})
export class NewsComponent implements OnInit {

  newsList: Array<NewsVO>;

  page: PageVO = new PageVO(0, 5, 0, [5, 15, 30, 60, 90]);

  constructor(private adminService: AdminService, private router: Router) {

  }

  ngOnInit(): void {
    this.getNewsList();

    // 글쓰기를 마치고 돌아오면 리프레쉬가 필요하다.
    this.router.events.subscribe(events => {
      // 부모, 자식 경로가 호출될때마다 여러가지 이벤트 발생. NavigationStart -> NavigationReconized -> NavigationEnd
      if (events instanceof NavigationStart) {
        console.log('nagigation start');
        if (events.url === '/admin/news') {
          this.getNewsList();
        }
      }
    });
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

  gotoWrite() {
    this.router.navigateByUrl(`/admin/news/write`);
  }

  gotoView(news: NewsVO) {

  }
}
