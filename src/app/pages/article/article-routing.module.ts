import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "list",
    loadChildren: () =>
      import("./list/article-list.module").then((m) => m.UserArticleListModule),
  },
  {
    path: "create",
    loadChildren: () =>
      import("./create/article-create.module").then(
        (m) => m.ArticleCreateModule
      ),
  },
  {
    path: "detail/:id",
    loadChildren: () =>
      import("./detail/article-detail.module").then(
        (m) => m.ArticleDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
