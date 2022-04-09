import { ElementRef, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UserInfo } from "@shared/interface/base.interface";

@Injectable({
  providedIn: "root",
})
export class BaseUtilService {
  constructor() {}

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
    (window as any).authorization = `Bearer ${userInfo.token}`;
  }

  // 获取用户信息
  public getUserInfo(): UserInfo {
    return this.userInfo;
  }
}
