import { Template } from "@angular/compiler/src/render3/r3_ast";
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleUtilService } from "@shared/service/article/article.util.service";
import { BaseUtilService } from "@shared/util/base.util.service";
import { DValidateRules, FormLayout, LoadingService } from "ng-devui";

@Component({
  selector: "app-create",
  templateUrl: "./article-create.component.html",
  styleUrls: ["./article-create.component.less"],
})
export class ArticleCreateComponent implements OnInit {
  @Input() articleId!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private articleUtil: ArticleUtilService,
    private baseUtil: BaseUtilService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((data: any = {}) => {
      this.id = data.id;
      this.queryArticle();
    });
  }

  public id!: string;
  public article: any;
  public markdown = "";
  public articleForm = this.fb.group({
    title: [""],
  });

  public markdownFormCfg = {
    xFormOnGetData: () => {},
    downZip: () => {},
  };

  public goBack() {
    this.router.navigate(["/article/list"]);
  }

  public downZip() {
    if (typeof this.markdownFormCfg.downZip === "function") {
      this.markdownFormCfg.downZip();
    }
  }

  public save() {
    if (this.id) {
      this.update();
    } else {
      this.create();
    }
  }

  private create() {
    const load = this.loadingService.open();
    this.articleUtil.createArticle$(this.getTemplate()).subscribe(
      () => {
        load.loadingInstance.close();
        this.router.navigate(["/article/list"]);
      },
      () => {
        load.loadingInstance.close();
      }
    );
  }

  private update() {
    const load = this.loadingService.open();
    this.articleUtil.updateArticleItem$(this.id, this.getTemplate()).subscribe(
      () => {
        load.loadingInstance.close();
        this.router.navigate(["/article/list"]);
      },
      () => {
        load.loadingInstance.close();
      }
    );
  }

  private queryArticle() {
    if (!this.id) {
      return;
    }
    const load = this.loadingService.open();
    this.articleUtil.getDecodeArticleItem$(this.id).subscribe(
      (data) => {
        this.article = { ...data };
        this.initExistArticle();
        load.loadingInstance.close();
      },
      () => {
        load.loadingInstance.close();
      }
    );
  }

  private getTemplate() {
    const template = {
      title: this.articleForm.get("title").value || "空标题",
      body: this.markdownFormCfg.xFormOnGetData(),
    };
    return template;
  }

  private initExistArticle() {
    if (!this.articleForm || !this.article) {
      return;
    }
    this.articleForm.setValue({
      title: this.article.title,
    });
    this.markdown = this.article.body;
  }
}
