import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserApiService } from "@shared/service/user/user.api.service";

@Injectable({
    providedIn: 'root'
})
export class UserUtilService {
    constructor(private userApi: UserApiService) { }

    // 用户登录
    public login$(body: any): Observable<any> {
        return this.userApi.login$(body);
    }



}