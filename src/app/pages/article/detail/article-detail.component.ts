import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleUtilService } from "@shared/service/article/article.util.service";

declare let editormd: any;

@Component({
  selector: "app-detail",
  templateUrl: "./article-detail.component.html",
  styleUrls: ["./article-detail.component.less"],
})
export class ArticleDetailComponent
  implements OnInit, AfterViewChecked, AfterViewInit
{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ele: ElementRef,
    private articleUtil: ArticleUtilService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.articleId = params.get("id") ?? "";
      this.loadData();
    });
  }

  ngAfterViewInit(): void {
    // this.initEditor();
  }

  ngAfterViewChecked(): void {
    this.initSideCatalogue();
  }

  public articleId!: string;
  public articleItem: any;
  public catalogues: Array<any> = [];
  public loading = false;

  private loadData() {
    if (!this.articleId) {
      this.goArticleList();
      return;
    }
    this.loading = true;
    this.articleUtil.getDecodeArticleItem$(this.articleId).subscribe(
      (data) => {
        this.loading = false;
        this.articleItem = data;
        // this.initEditor();
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.goArticleList();
      }
    );
  }

  private initEditor() {
    const targetDom = this.ele.nativeElement.querySelector("#markdown-content");
    if (!targetDom) {
      return;
    }

    editormd.markdownToHTML("markdown-content", {
      markdown: this.articleItem?.body || "",
    });
  }

  private initSideCatalogue() {
    const doms = this.ele.nativeElement.querySelector(
      "#ngx-markdown-editor .preview-panel"
    ).childNodes;
    if (!doms.length || this.catalogues.length) {
      return;
    }

    this.catalogues = [];
    const catalogueDom = ["h1", "h2", "h3"];
    let num = 0;
    let minLevel = Infinity;
    doms.forEach((dom: any) => {
      if (catalogueDom.includes(dom.localName)) {
        const title = dom.innerText;
        const id = `markdown-title-h-${num++}`;
        const level = parseInt(dom.localName.match("h([0-9]+)")[1]);
        minLevel = Math.min(minLevel, level);

        dom.setAttribute("id", id);
        this.catalogues.push({
          id,
          title,
          domElement: dom.localName,
          level,
        });
      }
    });

    this.catalogues.forEach((item) => {
      item.level = item.level - minLevel;
    });
  }

  private goArticleList() {
    this.router.navigate(["/article/list"]);
  }

  public goTargetAnchor(catalogue: any) {
    const domOffsetTop = this.ele.nativeElement.querySelector(
      `#${catalogue.id}`
    )?.offsetTop;
    if (!domOffsetTop) {
      return;
    }
    document.body.scrollTop = document.documentElement.scrollTop =
      domOffsetTop - 80;
  }
}
