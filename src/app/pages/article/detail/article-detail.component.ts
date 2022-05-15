import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArticleUtilService } from "@shared/service/article/article.util.service";

@Component({
  selector: "app-detail",
  templateUrl: "./article-detail.component.html",
  styleUrls: ["./article-detail.component.less"],
})
export class ArticleDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private articleUtil: ArticleUtilService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.articleId = params.get("id") ?? "";
      this.loadData();
    });
  }

  public articleId!: string;
  public articleItem: any;

  public loadData() {
    if (!this.articleId) {
      return;
    }
    this.articleUtil.getDecodeArticleItem$(this.articleId).subscribe(
      (data) => {
        console.log(data);
        this.articleItem = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
