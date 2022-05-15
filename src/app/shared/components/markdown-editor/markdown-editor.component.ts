import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
} from "@angular/core";
import { XFormCheckCfg, XFormGroup } from "@shared/interface/form-interface";

import JSZip from "jszip";
import FileSaver from "file-saver";

// 引入editormd.js
declare let editormd: any;

@Component({
  selector: "app-markdown-editor",
  templateUrl: "./markdown-editor.component.html",
  styleUrls: ["./markdown-editor.component.less"],
})
export class MarkdownEditorComponent
  implements OnInit, OnChanges, AfterViewInit, XFormGroup
{
  @Input() height = "calc(100vh)%";
  @Input() markdown = "";
  @Input() formCfg: XFormCheckCfg;

  ngOnInit() {
    this.initEditorConfig();
    this.xFormOnInit();
  }

  ngOnChanges(): void {
    if (this.markdown && this.editor) {
      setTimeout(() => {
        this.editor.setMarkdown(this.markdown);
      }, 500);
    }
  }

  ngAfterViewInit(): void {
    this.editor = editormd("markdown-editor", this.editorConfig);
    this.initPasteListener();
  }

  xFormOnInit(): void {
    if (this.formCfg) {
      this.formCfg.xFormOnGetData = this.xFormOnGetData;
      this.formCfg["downZip"] = this.downZip;
    }
  }

  xFormOnGetData = () => {
    return this.editor.getMarkdown();
  };

  constructor(private ele: ElementRef) {}

  private editor: any;
  private editorConfig = {
    width: "100%",
    height: "100%",
    path: "./assets/md_editor/lib/",
    codeFold: true,
    searchReplace: true,
    toolbar: true,
    emoji: false,
    taskList: true,
    tex: true,
    readOnly: false,
    tocm: true,
    watch: true,
    previewCodeHighlight: true,
    saveHTMLToTextarea: true,
    markdown: "",
    flowChart: true,
    syncScrolling: true,
    sequenceDiagram: true,
    toolbarIcons: () => {
      return [
        "undo",
        "redo",
        "|",
        "bold",
        "del",
        "italic",
        "quote",
        "ucwords",
        "uppercase",
        "lowercase",
        "|",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "|",
        "list-ul",
        "list-ol",
        "hr",
        "|",
        "link",
        "code",
        "preformatted-text",
        "code-block",
        "table",
        "datetime",
        "html-entities",
        "pagebreak",
        "|",
        "goto-line",
        "watch",
        "preview",
        "fullscreen",
        "clear",
      ];
    },
    placeholder: "添加文章内容",
    onload: () => {
      this.initPasteListener();
    },
  };
  private imageMap = new Map();
  private listener = false;

  private initEditorConfig() {
    this.editorConfig.height = this.height;
    this.editorConfig.markdown = this.markdown;
  }

  private initPasteListener() {
    setTimeout(() => {
      const listenerDom = this.ele.nativeElement?.querySelector(
        "#markdown-editor div:nth-child(1)"
      );

      if (!listenerDom || this.listener) {
        return;
      }

      listenerDom.addEventListener("paste", (e: any) => {
        e.preventDefault();
        if (e.target.localName !== "textarea") {
          return;
        }
        const textContent = e.clipboardData.getData("text/plain");
        let imageContent = "";
        let imageFile: any;

        for (const item of e.clipboardData.items) {
          if (item.type.startsWith("image/")) {
            imageFile = item.getAsFile();
            const _URL = window.URL || window.webkitURL;
            const src = _URL.createObjectURL(imageFile);
            this.imageMap.set(src, imageFile);
            imageContent += `![image](${src})`;
          }
        }

        this.editor.replaceSelection(`${textContent}${imageContent}`);
      });
      this.listener = true;
    }, 1000);
  }

  private downZip = () => {
    let content = this.xFormOnGetData();
    const zip = new JSZip();
    const img = zip.folder("images");

    this.imageMap.forEach((file, url) => {
      const regStr = `(${url})`;
      if (content.match(regStr)) {
        const imageName = `${url.substr(
          url.lastIndexOf("/") + 1
        )}-${file.type.replace("/", ".")}`;

        content = content.replaceAll(regStr, `(./images/${imageName})`);
        img.file(imageName, file, { base64: true });
      }
    });

    zip.file("aritcle.md", content);
    zip.generateAsync({ type: "blob" }).then((content) => {
      // 利用file-saver保存文件  自定义文件名
      FileSaver.saveAs(content, `aritcle-${Date.now()}.zip`);
    });
  };
}
