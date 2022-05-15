import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ArticleApiService } from "@shared/service/article/article.api.service";

@Injectable({
  providedIn: "root",
})
export class ArticleUtilService {
  constructor(private articleApi: ArticleApiService) {}

  // 获取文章列表
  public getDecodeArticleList$(params: any): Observable<any> {
    return this.articleApi.queryArticleList$(params);
  }

  // 创建文章
  public createArticle$(body: any): Observable<any> {
    return this.articleApi.createArticle$(body);
  }

  // 获取文章详情
  public getDecodeArticleItem$(id: string): Observable<any> {
    return this.articleApi.queryArticleItem$(id);
  }

  // 获取文章详情
  public updateArticleItem$(id: string, body: any): Observable<any> {
    return this.articleApi.updateArticleItem$(id, body);
  }
}
