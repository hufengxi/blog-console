import { Injectable } from "@angular/core";
import { DialogService, ModalService } from "ng-devui/modal";
import DeleteModalComponet from "./delete-modal.component";
import { DeleteModalModule } from "./delete-modal.module";

@Injectable({
  providedIn: DeleteModalModule,
})
export class DeleteModalService {
  constructor(private dialogService: DialogService) {}

  public openDeleteModal(deleteFun: Function) {
    const results = this.dialogService.open({
      id: "delete-modal",
      title: "删除文章",
      width: "300px",
      backdropCloseable: false,
      html: true,
      dialogtype: "warning",
      content: "删除内容后不可恢复，确定删除吗？",
      buttons: [
        {
          cssClass: "primary",
          text: "确认",
          disabled: false,
          handler: ($event: Event) => {
            results.modalInstance.hide();
            if (typeof deleteFun === "function") {
              deleteFun();
            }
          },
        },
        {
          id: "btn-cancel",
          cssClass: "common",
          text: "取消",
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
    });
    console.log(results);
  }
}
