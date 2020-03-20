import { Injectable } from "@angular/core";

import * as data from "src/app/error.json";

@Injectable()
export class ErrorMessage {
  data: any = <any>data;
  error(selector: string) {
    return this.data[selector];
  }
}
