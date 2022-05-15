import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "ng-devui/button";
import { ModalModule } from "ng-devui/modal";

import DeleteModalComponet from "./delete-modal.component";

const COMPONENT = [DeleteModalComponet];
const DEVUI = [ModalModule, ButtonModule];

@NgModule({
  declarations: [...COMPONENT],
  imports: [CommonModule, ...DEVUI],
})
export class DeleteModalModule {}
