import { Injectable } from '@angular/core';
import { ToasterService, Toast } from 'angular2-toaster';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';

declare var popupFunctionObject: any;

@Injectable()
export class CommonService {
  public static surveyDetail: any;
  constructor(
    private toasterService: ToasterService,
    private httpClient: HttpClientService,
  ) {
    this.toasterService = toasterService;
  }

  // Common toaster function
  toaster(data: string, flag: boolean) {
    let toast: Toast = {
      type: flag ? 'success' : 'error',
      title: flag ? 'Success' : 'Error',
      body: data,
      timeout: 2500,
      showCloseButton: false,
    };
    this.toasterService.pop(toast);
  }

  toasterNotification(data: string) {
    let toast: Toast = {
      type: 'info',
      title: 'Notification',
      body: data,
      timeout: 8000,
      showCloseButton: true,
    };
    this.toasterService.pop(toast);
  }

  toasterWarning(data: string) {
    let toast: Toast = {
      type: 'info',
      title: 'Warning',
      body: data,
      timeout: 8000,
      showCloseButton: true,
    };
    this.toasterService.pop(toast);
  }

  public saveSurveyObject(survey: any) {
    CommonService.surveyDetail = survey;
  }
  public getSelectedSurveyDetail() {
    return new Observable(observer => {
      if (CommonService.surveyDetail) {
        observer.next(CommonService.surveyDetail);
        return observer.complete();
      }
      this.getSelectedSurveyDetailFromAPI()
        .subscribe((x: any) => {
          CommonService.surveyDetail = x.Model;
          observer.next(CommonService.surveyDetail);
          observer.complete();
        });
    });
  }
  public getSelectedSurveyDetailFromAPI() {
    return this.httpClient.get('/survey/:id');
  }

}
