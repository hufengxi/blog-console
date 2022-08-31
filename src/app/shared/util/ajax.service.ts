import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CookieUtilService } from "./cookie.util";

const ORIGIN = "http://localhost:3000";

@Injectable({
  providedIn: "root",
})
export class AjaxService {
  constructor(
    private http: HttpClient,
    private cookieUtil: CookieUtilService
  ) {}

  public get(url: string, options: any = {}): Observable<any> {
    return this.http.get(`${ORIGIN}${url}`, this.setHeaderAhthor(options));
  }

  public post(url: string, body: any = {}, options: any = {}): Observable<any> {
    return this.http.post(
      `${ORIGIN}${url}`,
      body,
      this.setHeaderAhthor(options)
    );
  }

  public put(url: string, body: any = {}, options: any = {}): Observable<any> {
    return this.http.put(
      `${ORIGIN}${url}`,
      body,
      this.setHeaderAhthor(options)
    );
  }

  public delete(url: string, options: any = {}): Observable<any> {
    return this.http.delete(`${ORIGIN}${url}`, this.setHeaderAhthor(options));
  }

  public setHeaderAhthor(options: any = {}): any {
    const headers: any = {};
    headers.authorization = this.cookieUtil.get("authorization");

    if (headers?.authorization) {
      options.headers = { ...(options?.headers ?? {}), ...headers };
    }
    return options;
  }
}
