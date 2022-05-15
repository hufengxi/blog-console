import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccordionModule } from "ng-devui/accordion";
import { PaginationModule } from "ng-devui/pagination";
import { ButtonModule } from "ng-devui/button";

import { ArticleListComponent } from "@article/list/article-list.component";
import { ArticleListRoutingModule } from "@article/list/article-list-routing.module";
import { SearchModule } from "ng-devui/search";
import { LoadingModule } from "ng-devui";
import { DeleteModalModule } from "@shared/service/delete-modal/delete-modal.module";

const COMPONENT = [ArticleListComponent];

const DEVUI = [PaginationModule, ButtonModule, SearchModule, LoadingModule];

@NgModule({
  declarations: [...COMPONENT],
  imports: [
    CommonModule,
    ...DEVUI,
    DeleteModalModule,
    ArticleListRoutingModule,
  ],
})
export class ArticleListModule {}
