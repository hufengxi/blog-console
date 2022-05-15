import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ArticleCreateRoutingModule } from "@article/create/article-create-routing.module";
import { ArticleCreateComponent } from "@article/create/article-create.component";

import { FormModule } from "ng-devui/form";
import { TextInputModule } from "ng-devui/text-input";
import { TextareaModule } from "ng-devui/textarea";
import { ButtonModule } from "ng-devui/button";

const COMPONENT = [ArticleCreateComponent];

const DEVUI = [FormModule, TextInputModule, TextareaModule, ButtonModule];

@NgModule({
  declarations: [...COMPONENT],
  imports: [
    CommonModule,
    ArticleCreateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...DEVUI,
  ],
})
export class ArticleCreateModule {}
