import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { LeValidator } from "@shared/interface/form-interface";
import { UserUtilService } from "@shared/service/user/user.util.service";
import { BaseUtilService } from "@shared/util/base.util.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.less"],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userUtil: UserUtilService,
    private baseUtil: BaseUtilService
  ) {}

  // 是否显示密码
  public showPassword = false;
  public showConfPassword = false;
  public registerForm = this.fb.group({
    email: [""],
    tel: [""],
    nickname: [""],
    password: [""],
    confPassword: [""],
  });

  ngOnInit(): void {}

  // 登录操作
  public register() {
    const params = this.registerForm.value;

    this.userUtil.register$(params).subscribe(
      () => {
        this.goLogin();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public goLogin() {
    this.router.navigate(["/login"]);
  }
}
