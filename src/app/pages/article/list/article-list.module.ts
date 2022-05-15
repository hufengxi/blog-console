import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccordionModule } from "ng-devui/accordion";
import { PaginationModule } from "ng-devui/pagination";
import { ButtonModule } from "ng-devui/button";

import { ArticleListComponent } from "@article/list/article-list.component";
import { ArticleListRoutingModule } from "@article/list/article-list-routing.module";

const COMPONENT = [ArticleListComponent];

const DEVUI = [AccordionModule, PaginationModule, ButtonModule];

@NgModule({
  declarations: [...COMPONENT],
  imports: [CommonModule, ...DEVUI, ArticleListRoutingModule],
})
export class UserArticleListModule {}
