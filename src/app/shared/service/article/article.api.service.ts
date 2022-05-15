import { Injectable } from "@angular/core";
import { AjaxService } from "@shared/util/ajax.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ArticleApiService {
  constructor(private ajax: AjaxService) {}

  // 获取文章列表
  public queryArticleList$(params: any): Observable<any> {
    return this.ajax.get("/article", { params });
  }

  // 创建文章
  public createArticle$(body: any): Observable<any> {
    return this.ajax.post("/article", body);
  }

  // 获取文章详情
  public queryArticleItem$(id: string): Observable<any> {
    return this.ajax.get(`/article/${id}`);
  }

  // 更新文章
  public updateArticleItem$(id: string, body: any): Observable<any> {
    return this.ajax.put(`/article/${id}`, body);
  }

  // 删除文章
  public deleteArticlelItem$(id: string): Observable<any> {
    return this.ajax.delete(`/article/${id}`);
  }
}
