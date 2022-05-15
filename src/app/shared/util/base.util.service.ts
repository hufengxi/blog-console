import { ElementRef, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router, UrlCreationOptions } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class BaseUtilService {
  constructor(private router: Router) {}

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

  // navigate跳转到新的tab页面
  public navigateNewTab(
    commands: any[],
    navigationExtras?: UrlCreationOptions
  ) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(commands, navigationExtras)
    );
    // 第三个参数是防止网络钓鱼攻击
    let opener = window.open(`/taosha${url}`, "_blank", "noopener");
    opener = null;
  }
}
