import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { LeValidator } from "@shared/interface/form-interface";
import { UserUtilService } from "@shared/service/user/user.util.service";
import { BaseUtilService } from "@shared/util/base.util.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"],
})
export class LoginComponent implements OnInit, LeValidator {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userUtil: UserUtilService,
    private baseUtil: BaseUtilService
  ) {}

  ngOnInit(): void {
    this.leOnInitForm();
  }

  leOnInitForm(): void {
    this.loginForm.valueChanges.subscribe((data: any) => {
      this.userPassError = false;
      this.loginData = data;
    });
  }

  // 是否显示密码
  public showPassword = false;
  // 用户名密码登录的数据和 form
  public loginData = {
    username: "",
    password: "",
  };
  public loginForm = this.fb.group({
    username: [this.loginData.username],
    password: [this.loginData.password],
  });
  // 用户名或密码错误
  public userPassError = false;

  // 登录操作
  public login() {
    if (!this.loginData?.username || !this.loginData?.password) {
      return;
    }

    this.userPassError = false;

    this.userUtil.login$(this.loginData).subscribe(
      (data) => {
        if (data.token) {
          this.baseUtil.setUserInfo(data);
          this.router.navigate(["article/list"]);
          return;
        }
        this.userPassError = true;
      },
      (err) => {
        console.log(err);
        this.userPassError = true;
      }
    );
  }
}
