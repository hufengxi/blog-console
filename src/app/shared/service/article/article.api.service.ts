import { Injectable } from "@angular/core";
import { AjaxService } from "@shared/util/ajax.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ArticleApiService {
  constructor(private ajax: AjaxService) {}

  // 获取用户列表
  public queryArticleList$(params: any): Observable<any> {
    return this.ajax.get("http://localhost:3000/article", { params });
  }
}
