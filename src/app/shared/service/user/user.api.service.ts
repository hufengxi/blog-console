import { Injectable } from "@angular/core";
import { AjaxService } from "@shared/util/ajax.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    constructor(private ajax: AjaxService) { }

    // 用户登录
    public login$(body: any): Observable<any> {
        return this.ajax.post('http://localhost:3000/user/login', body);
    }



}