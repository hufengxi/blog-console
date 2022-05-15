import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ArticleDetailRoutingModule } from "./article-detail-routing.module";
import { ArticleDetailComponent } from "./article-detail.component";
import { IconModule } from "ng-devui/icon";

const DEVUI = [IconModule];

@NgModule({
  declarations: [ArticleDetailComponent],
  imports: [CommonModule, ArticleDetailRoutingModule, ...DEVUI],
})
export class ArticleDetailModule {}
