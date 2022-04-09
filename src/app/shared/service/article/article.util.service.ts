import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ArticleApiService } from "@shared/service/article/article.api.service";

@Injectable({
  providedIn: "root",
})
export class ArticleUtilService {
  constructor(private articleApi: ArticleApiService) {}

  // 用户登录
  public getDecodeArticleList$(params: any): Observable<any> {
    return this.articleApi.queryArticleList$(params);
  }
}
