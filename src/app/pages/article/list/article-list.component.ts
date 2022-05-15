import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserInfo } from "@shared/interface/base.interface";
import { ArticleUtilService } from "@shared/service/article/article.util.service";
import { DeleteModalService } from "@shared/service/delete-modal/delete-modal.service";
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
    private userShared: UserSharedService,
    private deleteModal: DeleteModalService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loading = false;
  public searchValue = "";
  // 用户信息
  public userInfo: UserInfo = this.userShared.getUserInfo();
  // table 信息
  public tableInfo: any = {
    srcData: [],
  };
  public pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 7,
    pageSizeOptions: [7, 20, 50],
    pageChange: () => {
      this.loadData();
    },
  };
  // 操作
  public actionMenus = [
    {
      title: "编辑",
      click: (item: any) => {
        this.router.navigate(["/article/create"], {
          queryParams: {
            id: item._id,
          },
        });
      },
    },
    {
      title: "浏览",
      click: (item: any) => {
        this.baseUtil.navigateNewTab([`/article/detail/${item._id}`]);
      },
    },
    {
      title: "删除",
      click: (item: any) => {
        this.deleteModal.openDeleteModal(() => {
          this.articleUtil.deleteArticleItem$(item._id).subscribe(() => {
            this.loadData();
          });
        });
      },
    },
  ];

  public loadData() {
    this.loadArticle();
  }

  public goCreateArticle() {
    this.router.navigate(["/article/create"]);
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

    if (this.searchValue) {
      params.title = this.searchValue;
    }

    this.loading = true;
    this.articleUtil.getDecodeArticleList$(params).subscribe(
      (res) => {
        this.tableInfo.srcData = res.items || [];
        this.pager.total = res.total || 0;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  public onSearch(event: any) {
    this.searchValue = event;
    this.loadData();
  }

  public refresh() {
    this.loadData();
  }
}
