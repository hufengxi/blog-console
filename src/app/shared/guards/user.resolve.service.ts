import { Injectable } from "@angular/core";
import { Resolve, Router } from "@angular/router";
import { UserSharedService } from "@shared/service/user/user.shared.service";
import { UserUtilService } from "@shared/service/user/user.util.service";
import { CookieUtilService } from "@shared/util/cookie.util";
import { catchError, map, Observable, of } from "rxjs";

type returnType = Promise<{ name: string }>;

@Injectable({
  providedIn: "root",
})
export class UserResolveService implements Resolve<Observable<any>> {
  constructor(
    private router: Router,
    private cookieUtil: CookieUtilService,
    private userUtil: UserUtilService,
    private userShared: UserSharedService
  ) {}
  resolve(): Observable<any> {
    let userInfo = this.userShared.getUserInfo();
    if (userInfo) {
      this.userShared.setUserInfo(userInfo);
      return of(userInfo);
    }

    if (!this.cookieUtil.get("authorization")) {
      this.router.navigate(["/login"]);
    }

    return this.userUtil.queryUserInfo$().pipe(
      map((data) => {
        userInfo = data;
        if (userInfo.token) {
          this.userShared.setUserInfo(userInfo);
          return this.userShared.getUserInfo();
        }
        this.router.navigate(["/login"]);
        return of(null);
      }),
      catchError(() => {
        this.router.navigate(["/login"]);
        return of(null);
      })
    );
  }
}
