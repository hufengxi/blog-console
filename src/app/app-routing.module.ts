import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MarkdownEditorComponent } from "@shared/components/markdown-editor/markdown-editor.component";
import { UserResolveService } from "@shared/guards/user.resolve.service";
import FullComponent from "./layout/full/full.component";
import LeftMenuComponent from "./layout/leftmenu/leftmenu.component";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./pages/user/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/user/register/register.module").then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: "article",
    resolve: {
      userInfo: UserResolveService,
    },
    component: FullComponent,
    children: [
      {
        path: "list",
        loadChildren: () =>
          import("./pages/article/list/article-list.module").then(
            (m) => m.ArticleListModule
          ),
      },
      {
        path: "detail/:id",
        loadChildren: () =>
          import("./pages/article/detail/article-detail.module").then(
            (m) => m.ArticleDetailModule
          ),
      },
    ],
  },
  {
    path: "article/create",
    resolve: {
      userInfo: UserResolveService,
    },
    loadChildren: () =>
      import("./pages/article/create/article-create.module").then(
        (m) => m.ArticleCreateModule
      ),
  },
  {
    path: "",
    // 重定向
    redirectTo: "login",
    // 完全匹配
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
