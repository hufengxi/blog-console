import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserInfo } from "@shared/interface/base.interface";
import { ArticleUtilService } from "@shared/service/article/article.util.service";
import { UserSharedService } from "@shared/service/user/user.shared.service";
import { BaseUtilService } from "@shared/util/base.util.service";
import { CookieUtilService } from "@shared/util/cookie.util";

@Component({
  selector: "app-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.less"],
})
export class ArticleListComponent implements OnInit {
  constructor(
    private router: Router,
    private articleUtil: ArticleUtilService,
    private baseUtil: BaseUtilService,
    private userShared: UserSharedService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  // 用户信息
  public userInfo: UserInfo = this.userShared.getUserInfo();
  // table 信息
  public tableInfo: any = {
    srcData: [],
  };
  public pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    pageChange: () => {
      this.loadData();
    },
  };
  // 操作
  public actionMenus = [
    {
      title: "编辑",
      click: (item: any) => {
        this.router.navigate(["/create/article"], {
          queryParams: {
            id: item._id,
          },
        });
      },
    },
    {
      title: "浏览",
      click: (item: any) => {
        this.baseUtil.navigateNewTab([`/detail/article/${item._id}`]);
      },
    },
    {
      title: "删除",
      click: () => {},
    },
  ];

  public loadData() {
    this.loadArticle();
  }

  public goCreateArticle() {
    this.router.navigate(["/create/article"]);
  }

  // 加载文章列表
  public loadArticle() {
    const params: any = {
      limit: this.pager.pageSize,
      offset: this.pager.pageSize * (this.pager.pageIndex - 1),
    };
    if (this.userInfo._id) {
      params.userId = this.userInfo._id;
    }
    this.articleUtil.getDecodeArticleList$(params).subscribe(
      (res) => {
        this.tableInfo.srcData = res.items || [];
        this.pager.total = res.total || 0;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
