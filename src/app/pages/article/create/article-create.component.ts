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
  public title = "创建Blog";
  public btnText = "创建";

  public layoutDirection: FormLayout = FormLayout.Horizontal;
  public articleForm = this.fb.group({
    title: [""],
    body: ["", [Validators.required]],
  });

  public articleFormRules: any = {
    title: {
      validators: [{ required: true }],
    },
    body: {
      validators: [{ required: true }],
    },
  };

  public save() {
    if (!this.checkAll()) {
      return;
    }

    if (this.id) {
      this.update();
    } else {
      this.create();
    }
  }

  public create() {
    const params = this.articleForm.value;
    const load = this.loadingService.open();
    this.articleUtil.createArticle$(params).subscribe(
      () => {
        load.loadingInstance.close();
        this.router.navigate(["/article/list"]);
      },
      () => {
        load.loadingInstance.close();
      }
    );
  }

  public update() {
    const params = this.articleForm.value;
    const load = this.loadingService.open();
    this.articleUtil.updateArticleItem$(this.id, params).subscribe(
      () => {
        load.loadingInstance.close();
        this.router.navigate(["/article/list"]);
      },
      () => {
        load.loadingInstance.close();
      }
    );
  }

  public queryArticle() {
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

  public goBack() {
    this.router.navigate(["/article/list"]);
  }

  public initExistArticle() {
    if (!this.articleForm || !this.article) {
      return;
    }
    this.articleForm.setValue({
      title: this.article.title,
      body: this.article.body,
    });

    this.title = "更新Blog";
    this.btnText = "更新";
  }

  public checkAll() {
    return this.baseUtil.checkForm(this.articleForm, this.elementRef);
  }
}
