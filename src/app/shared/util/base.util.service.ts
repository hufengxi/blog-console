import { ElementRef, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router, UrlCreationOptions } from "@angular/router";
import { UserInfo } from "@shared/interface/base.interface";
import { CookieUtilService } from "./cookie.util";

@Injectable({
  providedIn: "root",
})
export class BaseUtilService {
  constructor(private cookieUtil: CookieUtilService, private router: Router) {}

  // 用户信息
  public userInfo: UserInfo = {} as UserInfo;

  public checkForm(formGroup: FormGroup, elementRef: ElementRef): boolean {
    if (!formGroup?.controls) {
      return true;
    }

    Object.values(formGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });

    for (const controlName of Object.keys(formGroup.controls)) {
      if (formGroup?.get(controlName)?.errors) {
        const targeDom = elementRef?.nativeElement?.querySelector(
          `[formcontrolname=${controlName}]`
        );
        if (targeDom) {
          targeDom.scrollIntoView({ block: "center" });
          targeDom.focus();
        }
        return false;
      }
    }
    return true;
  }

  // 配置用户信息
  public setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
    this.cookieUtil.set("authorization", `Bearer ${userInfo.token}`);
  }

  // 获取用户信息
  public getUserInfo(): UserInfo {
    return this.userInfo;
  }

  // navigate跳转到新的tab页面
  public navigateNewTab(
    commands: any[],
    navigationExtras?: UrlCreationOptions
  ) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(commands, navigationExtras)
    );
    // 第三个参数是防止网络钓鱼攻击
    let opener = window.open(url, "_blank", "noopener");
    opener = null;
  }
}
