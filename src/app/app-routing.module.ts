import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "user",
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./pages/article/article.module').then(m => m.ArticleModule)
  },
  {
    path: "",
    // 重定向
    redirectTo: "user",
    // 完全匹配
    pathMatch: "full"
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
