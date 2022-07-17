import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import HeaderComponent from "./header.component";

const ANGULAR = [CommonModule];
const COMPONENT = [HeaderComponent];

@NgModule({
  imports: [...ANGULAR],
  declarations: [...COMPONENT],
  exports: [...COMPONENT],
})
export default class HeaderModule {}
