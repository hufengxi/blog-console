import { NgModule } from "@angular/core";
import { MarkdownEditorComponent } from "./markdown-editor.component";

const COMPONENT = [MarkdownEditorComponent];

@NgModule({
  declarations: [...COMPONENT],
  imports: [],
  exports: [...COMPONENT],
})
export class MarkdownEditorModule {}
