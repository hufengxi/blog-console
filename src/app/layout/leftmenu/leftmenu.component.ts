import { Component } from "@angular/core";

@Component({
  selector: "app-leftmenu",
  templateUrl: "./leftmenu.component.html",
  styleUrls: ["./leftmenu.component.less"],
})
export default class LeftMenuComponent {
  constructor() {}

  // 菜单
  public menu = [
    {
      title: "文章",
      link: "/list/article",
    },
  ];
}
