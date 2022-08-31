import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LMarkdownEditorModule } from "ngx-markdown-editor";
import { NgxMarkdownEditorComponent } from "./ngx-markdown-editor.component";

const COMPONENT = [NgxMarkdownEditorComponent];

@NgModule({
  declarations: [...COMPONENT],
  imports: [FormsModule, LMarkdownEditorModule],
  exports: [...COMPONENT],
})
export class NgxMarkdownEditorModule {}
