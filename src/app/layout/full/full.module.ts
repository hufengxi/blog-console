import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import HeaderModule from "../header/header.module";
import FullComponent from "./full.component";

const ANGULAR = [CommonModule, RouterModule];
const MODULE = [HeaderModule];
const COMPONENT = [FullComponent];

@NgModule({
  imports: [...ANGULAR, MODULE],
  declarations: [...COMPONENT],
  exports: [...COMPONENT],
})
export default class FullModule {}
