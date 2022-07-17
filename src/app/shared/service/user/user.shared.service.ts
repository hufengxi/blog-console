import { Injectable } from "@angular/core";
import { UserInfo } from "@shared/interface/base.interface";
import { CookieUtilService } from "@shared/util/cookie.util";

@Injectable({
  providedIn: "root",
})
export class UserSharedService {
  constructor(private cookieUtil: CookieUtilService) {}

  // 用户信息
  public userInfo: UserInfo;

  // 配置用户信息
  public setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
    if (this.userInfo?.token) {
      this.cookieUtil.set("authorization", `Bearer ${userInfo.token}`);
    }
  }

  // 获取用户信息
  public getUserInfo(): UserInfo {
    return this.userInfo;
  }

  // 清楚用户信息
  public clearUserInfo() {
    this.userInfo = null;
    this.cookieUtil.remove("authorization");
  }
}
