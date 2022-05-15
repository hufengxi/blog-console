import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserInfo } from "@shared/interface/base.interface";
import { UserSharedService } from "@shared/service/user/user.shared.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"],
})
export default class HeaderComponent {
  constructor(private router: Router, private userShared: UserSharedService) {}

  // 用户信息
  public userInfo: UserInfo = this.userShared.getUserInfo();

  public userOptions = [
    {
      title: "写文章",
      icon: "icon-edit",
      click: () => {
        this.router.navigate(["/article/create"]);
      },
    },
    {
      title: "退出",
      icon: "icon-exit",
      click: () => {
        this.logOut();
      },
    },
  ];

  public logOut() {
    this.userShared.clearUserInfo();
    this.router.navigate(["/login"]);
  }
}
