import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import LeftMenuModule from "./layout/leftmenu/leftmenu.module";
import FullModule from "./layout/full/full.module";
import { MarkdownEditorModule } from "@shared/components/markdown-editor/markdown-editor.module";
import {
  APP_BASE_HREF,
  HashLocationStrategy,
  LocationStrategy,
} from "@angular/common";

const ANGULAR = [
  HttpClientModule,
  BrowserAnimationsModule,
  BrowserModule,
  AppRoutingModule,
];
const MODULE = [LeftMenuModule, FullModule, MarkdownEditorModule];

@NgModule({
  declarations: [AppComponent],
  imports: [...ANGULAR, ...MODULE],
  providers: [{ provide: APP_BASE_HREF, useValue: "/taosha" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
