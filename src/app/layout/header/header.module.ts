import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import HeaderComponent from "./header.component";
import { IconModule } from "ng-devui/icon";

const ANGULAR = [CommonModule];
const DEVUI = [IconModule];
const COMPONENT = [HeaderComponent];

@NgModule({
  imports: [...ANGULAR, ...DEVUI],
  declarations: [...COMPONENT],
  exports: [...COMPONENT],
})
export default class HeaderModule {}
