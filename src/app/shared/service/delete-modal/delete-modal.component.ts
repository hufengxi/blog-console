import { Component, ElementRef, Input } from "@angular/core";

@Component({
  selector: "delete-modal",
  templateUrl: "./delete-modal.component.html",
  styleUrls: ["./delete-modal.component.less"],
})
export default class DeleteModalComponet {
  constructor(private elr: ElementRef) {}
  parent: HTMLElement;
  @Input() data: any;
  ngOnInit() {
    this.parent = this.elr.nativeElement.parentElement;
  }

  close(event: any) {
    this.data.onClose(event);
  }
}
