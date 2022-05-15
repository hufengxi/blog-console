import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ArticleApiService } from "@shared/service/article/article.api.service";
import { TimeUtilService } from "@shared/util/time.util.service";

@Injectable({
  providedIn: "root",
})
export class ArticleUtilService {
  constructor(
    private articleApi: ArticleApiService,
    private time: TimeUtilService
  ) {}

  // 获取文章列表
  public getDecodeArticleList$(params: any): Observable<any> {
    return this.articleApi.queryArticleList$(params).pipe(
      map((res) => {
        const items = (res.items || []).map((item: any) =>
          this.decodeArticleItem(item)
        );
        res.items = [...items];
        return res;
      })
    );
  }

  // 创建文章
  public createArticle$(body: any): Observable<any> {
    return this.articleApi.createArticle$(body);
  }

  // 获取文章详情
  public getDecodeArticleItem$(id: string): Observable<any> {
    return this.articleApi
      .queryArticleItem$(id)
      .pipe(map((item) => this.decodeArticleItem(item)));
  }

  // 获取文章详情
  public updateArticleItem$(id: string, body: any): Observable<any> {
    return this.articleApi.updateArticleItem$(id, body);
  }

  // 删除文章
  public deleteArticleItem$(id: string): Observable<any> {
    return this.articleApi.deleteArticlelItem$(id);
  }

  public decodeArticleItem(article: any): any {
    article.createTime = this.time.transform(article.createTime);
    article.updateTime = this.time.transform(article.updateTime);
    return article;
  }
}
