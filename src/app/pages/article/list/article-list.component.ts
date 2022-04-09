import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserInfo } from "@shared/interface/base.interface";
import { ArticleUtilService } from "@shared/service/article/article.util.service";
import { BaseUtilService } from "@shared/util/base.util.service";

@Component({
  selector: "app-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.less"],
})
export class ArticleListComponent implements OnInit {
  constructor(
    private router: Router,
    private articleUtil: ArticleUtilService,
    private baseUtil: BaseUtilService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  // 菜单
  public menu = [
    {
      title: "文章",
      link: "/article/list",
      router: ["article/listm"],
    },
  ];
  // 用户信息
  public userInfo: UserInfo = this.baseUtil.getUserInfo();
  //
  public tableInfo: any = {
    srcData: [],
    pageSize: {
      offset: 0,
      limit: 1,
      total: 0,
    },
  };

  public loadData() {
    this.loadArticle();
  }

  // 加载文章列表
  public loadArticle() {
    const params: any = {
      limit: 1,
      offset: 0,
    };
    if (this.userInfo._id) {
      params.userId = this.userInfo._id;
    }
    this.articleUtil.getDecodeArticleList$(params).subscribe(
      (res) => {
        this.tableInfo.srcData = res.items || [];
        this.tableInfo.pageSize.total = res.total;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
