import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AjaxService {
    constructor(private http: HttpClient) { }

    public get(url: string, options: any = {}): Observable<any> {
        return this.http.get(url, this.setHeaderAhthor(options));
    }

    public post(url: string, body: any = {}, options: any = {}): Observable<any> {
        return this.http.post(url, body, this.setHeaderAhthor(options));
    }

    public setHeaderAhthor(options: any = {}): any {
        const headers: any = {};
        headers.authorization = (window as any).authorization;
        if (headers?.authorization) {
            options.headers = { ...(options?.headers ?? {}), ...headers };
        }
        return options;
    }

}