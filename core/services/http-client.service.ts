import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { timeout, catchError } from "rxjs/operators";
import { RouteConfig } from "src/app/route.config";

export interface IRequestOptions {
  body?: any;
  headers?: HttpHeaders | { [header: string]: string | Array<string> };
  observe?: any;
  params?: HttpParams | { [param: string]: string | Array<string> };
  reportProgress?: boolean;
  responseType?: "arraybuffer" | "blob" | "json" | "text";
  withCredentials?: boolean;
}

@Injectable()
export class HttpClientService {
  constructor(private http: HttpClient, private routeConfig: RouteConfig) {}

  /**
   * Make http GET request without authentication token
   * @param url
   */
  get(url: string) {
    return this.http.get<any>(this.routeConfig.url(url));
  }

  /**
   * Make http PUT request without authentication token
   * @param url
   * @param data
   */
  put(url: string, body: any) {
    return this.http.put<any>(this.routeConfig.url(url), body);
  }

  delete(url: string) {
    return this.http.delete<any>(this.routeConfig.url(url));
  }

  /**
   * Make http GET request with authentication token
   * @param url
   */
  authGet(url: string) {
    return this.http.get<any>(this.routeConfig.url(url));
  }

  /**
   * Make http POST request without authentication token
   * @param url
   * @param data
   */
  post(url: string, data: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    const httpOptions = { headers: headers };
    //let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(data);

    return this.http
      .post<any>(this.routeConfig.url(url), body, httpOptions)
      .pipe(timeout(3600000));
  }

  /**
   * Make http POST with authentication token
   * @param url
   * @param data
   */
  authPost(url: string, data: any) {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    // let options = new RequestOptions({ headers: headers });
    const options = { headers: headers };
    let body = JSON.stringify(data);

    return this.http.post<any>(this.routeConfig.url(url), body, options);
  }

  /**
   * Download file
   * @param url
   * @param data
   */
  authDownloadFile(url: string, data: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
      responseType: "blob"
    };
    let body = JSON.stringify(data);

    return this.http.post<any>(this.routeConfig.url(url), body, {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
      responseType: "json"
    });
  }

  /**
   * Make POST for the image upload with authentication token
   * @param url
   * @param file
   */
  authImageUpload(url: string, file: any) {
    let input = new FormData();
    input.append("file", file);
    let headers = new HttpHeaders();
    headers = headers.set("Accept", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("id_token")
    );
    const httpOptions = { headers: headers };
    return this.http.post<any>(this.routeConfig.url(url), input, httpOptions);
  }
}
