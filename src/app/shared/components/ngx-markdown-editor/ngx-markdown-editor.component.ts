import JSZip from "jszip";
import FileSaver from "file-saver";
import { Component, Input } from "@angular/core";
import { MdEditorOption, UploadResult } from "ngx-markdown-editor";
import { XFormCheckCfg, XFormGroup } from "@shared/interface/form-interface";

@Component({
  selector: "app-ngx-markdown-editor",
  templateUrl: "./ngx-markdown-editor.component.html",
  styleUrls: ["./ngx-markdown-editor.component.less"],
})
export class NgxMarkdownEditorComponent implements XFormGroup {
  @Input() height = "calc(100vh)%";
  @Input() mode: "editor" | "preview" = "editor";
  @Input() content = "";
  @Input() formCfg: XFormCheckCfg;

  ngOnInit() {
    this.xFormOnInit();
  }

  xFormOnInit(): void {
    if (this.formCfg) {
      this.formCfg.xFormOnGetData = this.xFormOnGetData;
      this.formCfg["downZip"] = this.downZip;
    }
  }

  xFormOnGetData = () => {
    return this.content;
  };

  constructor() {}

  public options: MdEditorOption = {
    showBorder: false,
    markedjsOpt: {},
  };

  onEditorLoaded(editor: any) {
    console.log(editor);
  }

  private downZip = () => {
    let content = this.xFormOnGetData();
    const zip = new JSZip();
    const img = zip.folder("images");

    // this.imageMap.forEach((file, url) => {
    //   const regStr = `(${url})`;
    //   if (content.match(regStr)) {
    //     const imageName = `${url.substr(
    //       url.lastIndexOf("/") + 1
    //     )}-${file.type.replace("/", ".")}`;

    //     content = content.replaceAll(regStr, `(./images/${imageName})`);
    //     img.file(imageName, file, { base64: true });
    //   }
    // });

    zip.file("aritcle.md", content);
    zip.generateAsync({ type: "blob" }).then((content) => {
      // 利用file-saver保存文件  自定义文件名
      FileSaver.saveAs(content, `aritcle-${Date.now()}.zip`);
    });
  };
}
