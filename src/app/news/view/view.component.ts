import { Component, OnInit } from '@angular/core';
import {NewsVO} from "../../domain/news.vo";
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  news: NewsVO;

  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let news_id = +params['news_id'];
      this.appService.findOneNews(news_id)
        .then(res => {
          this.news = res;
        });
    });
  }
}
