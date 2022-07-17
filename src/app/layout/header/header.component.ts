import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserSharedService } from "@shared/service/user/user.shared.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"],
})
export default class HeaderComponent {
  constructor(private router: Router, private userShared: UserSharedService) {}

  public logOut() {
    this.userShared.clearUserInfo();
    this.router.navigate(["/login"]);
  }
}
