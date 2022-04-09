import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule } from 'ng-devui/accordion';

import { ArticleListComponent } from '@article/list/article-list.component';
import { ArticleListRoutingModule } from '@article/list/article-list-routing.module';

const COMPONENT = [
  ArticleListComponent
];

const DEVUI = [
  AccordionModule
];

@NgModule({
  declarations: [
    ...COMPONENT
  ],
  imports: [
    CommonModule,
    ...DEVUI,
    ArticleListRoutingModule
  ]
})
export class UserArticleListModule { }
