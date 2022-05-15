import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CookieUtilService {
  public encode(value: string) {
    return String(value).replace(/[,;"\\=\s%]/g, (character) => {
      return encodeURIComponent(character);
    });
  }

  public decode(value: string) {
    return decodeURIComponent(value);
  }

  public all() {
    if (document.cookie === "") return {};

    const cookies = document.cookie.split("; ");
    const result: any = {};

    for (let i = 0, len = cookies.length; i < len; i++) {
      const item = cookies[i].split("=") || [];
      const key = this.decode(item[0] ?? "");
      const value = this.decode(item[1] ?? "");
      if (key) {
        result[key] = value;
      }
    }

    return result;
  }

  public set(
    key: string,
    value: string,
    options?: {
      expires?: number;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: string;
    }
  ) {
    const expiresMultiplier = 60 * 60 * 1;
    let expires = "";
    if (options?.expires) {
      expires = `;expires=${new Date(
        +new Date() + 1000 * expiresMultiplier * options?.expires
      ).toUTCString()}`;
    }

    const path = `;path=${options?.path ?? "/"}`;
    const domain = options?.domain ? `;domain=${options.domain}` : "";
    const secure = options?.secure ? ";secure" : "";
    const sameSite = options?.sameSite ? `;domain=${options.sameSite}` : "";

    document.cookie = `${this.encode(key)}=${this.encode(
      value
    )}${expires}${path}${domain}${secure}${sameSite}`;
  }

  public get(key: string) {
    const cookies = this.all() || {};
    return cookies[key];
  }

  public remove(key: string) {
    this.set(key, "", { expires: -1 });
  }
}
