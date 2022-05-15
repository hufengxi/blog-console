import { Observable } from "rxjs";

export interface LeValidator {
  leOnInitForm: () => void;
}

export interface XFormGroup {
  xFormOnInit(): void;
  xFormOnValidate?($event?: any): boolean | void;
  xFormOnGetData?($event?: any): any;
  xFormOnAsyncValidate?($event?: any): Observable<boolean | void>;
  [pop: string]: any;
}

export interface XFormCheckCfg {
  xFormOnValidate?($event?: any): boolean | void;
  xFormOnGetData?($event?: any): any;
  xFormOnAsyncValidate?($event?: any): Observable<boolean | void>;
  [pop: string]: any;
}
