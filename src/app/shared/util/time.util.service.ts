import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";

export const LocaleDateFormat = {
  date: "yyyy/MM/dd",
  time: "HH:mm:ss",
  dateTime: "yyyy/MM/dd HH:mm:ss",
  dateTimeZone: "yyyy/MM/dd HH:mm:ss zzzz",
};

@Injectable({
  providedIn: "root",
})
export class TimeUtilService {
  // 将时间按照指定格式转换
  public transform(
    value: any = new Date(),
    format: "date" | "time" | "dateTime" | "dateTimeZone" = "dateTimeZone"
  ): string {
    let time: any = value;
    // 火狐浏览器不兼容 utc 格式的时间
    if (typeof time === "string" && value.includes("UTC")) {
      time = this.utcTime2Milliseconds(value);
    }

    const timeString = formatDate(value, LocaleDateFormat[format], "en-US");
    return timeString;
  }

  /**
   * utc时间转换为时间戳 2014-04-03 15:31:15 -> 11233445566
   */
  public utcTime2Milliseconds(utcTime: string): number | string {
    const offset = -new Date().getTimezoneOffset() * 60 * 1000;
    if (!utcTime) {
      return "";
    }
    const milliSeconds = this.localTime2Milliseconds(utcTime) + offset;
    return milliSeconds;
  }

  /**
   * 本地时间转换为时间戳 2014-04-03 15:31:15 -> 11233445566
   */
  public localTime2Milliseconds(localTime: string): number {
    const year = localTime.substr(0, 4);
    const month = localTime.substr(5, 2);
    const date = localTime.substr(8, 2);
    const hour = localTime.substr(11, 2);
    const minute = localTime.substr(14, 2);
    const second = localTime.substr(17, 2);
    return new Date(
      Number(year),
      Number(month) - 1,
      Number(date),
      Number(hour),
      Number(minute),
      Number(second)
    ).getTime();
  }
}
