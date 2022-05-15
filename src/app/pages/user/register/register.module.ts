import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TextInputModule } from "ng-devui/text-input";
import { FormModule } from "ng-devui/form";
import { ButtonModule } from "ng-devui/button";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from "./register.component";

const ANGULAR = [CommonModule, FormsModule, ReactiveFormsModule];
const MODEL = [RegisterRoutingModule];
const DEVUI = [TextInputModule, FormModule, ButtonModule];
const COMPONENT = [RegisterComponent];

@NgModule({
  declarations: [...COMPONENT],
  imports: [...ANGULAR, ...DEVUI, ...MODEL],
})
export class RegisterModule {}
