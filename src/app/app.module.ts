import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MarkdownModule } from "ngx-markdown";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import LeftMenuModule from "./layout/leftmenu/leftmenu.module";
import FullModule from "./layout/full/full.module";

const ANGULAR = [
  HttpClientModule,
  BrowserAnimationsModule,
  BrowserModule,
  AppRoutingModule,
  MarkdownModule.forRoot(),
];
const MODULE = [LeftMenuModule, FullModule];

@NgModule({
  declarations: [AppComponent],
  imports: [...ANGULAR, ...MODULE],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
