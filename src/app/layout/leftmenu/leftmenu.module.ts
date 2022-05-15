import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AccordionModule } from "ng-devui";
import HeaderModule from "../header/header.module";
import LeftMenuComponent from "./leftmenu.component";

const ANGULAR = [CommonModule, RouterModule];
const DEVUI = [AccordionModule];
const MODULE = [HeaderModule];
const COMPONENT = [LeftMenuComponent];

@NgModule({
  imports: [...ANGULAR, ...DEVUI, ...MODULE],
  declarations: [...COMPONENT],
  exports: [...COMPONENT],
})
export default class LeftMenuModule {}
