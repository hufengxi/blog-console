import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkdownModule } from "ngx-markdown";

import { ArticleDetailRoutingModule } from "./article-detail-routing.module";
import { ArticleDetailComponent } from "./article-detail.component";

@NgModule({
  declarations: [ArticleDetailComponent],
  imports: [
    CommonModule,
    ArticleDetailRoutingModule,
    MarkdownModule.forChild(),
  ],
})
export class ArticleDetailModule {}
