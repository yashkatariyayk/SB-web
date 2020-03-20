import { Subject, ReplaySubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClientService } from "./http-client.service";

@Injectable()
export class SharedService {
  public static userId: number;
  public static userSubscriptionFeature: any;
  userName = new Subject();
  userImage = new Subject();
  perentUserName = new Subject();
  perentUserId = new Subject();
  constructor(private httpClient: HttpClientService) {}

  public clearCache() {
    SharedService.userSubscriptionFeature = undefined;
  }

  //################## Get User Subscription All Feature : Start ##############################################
  public getUserSubscriptionFeature() {
    return new Observable(observer => {
      if (SharedService.userSubscriptionFeature) {
        observer.next(SharedService.userSubscriptionFeature);
        return observer.complete();
      }
      this.getUserSubscriptionFeatureFromAPI().subscribe((x: any) => {
        SharedService.userSubscriptionFeature = x.Model;
        observer.next(SharedService.userSubscriptionFeature);
        observer.complete();
      });
    });
  }

  public getUserSubscriptionFeatureFromAPI() {
    return this.httpClient.authGet(
      "/ManageMyAccount/GetUserSubscriptionAllFeature"
    );
  }

  public setUserSubscriptionFeature(data: any) {
    SharedService.userSubscriptionFeature = data;
  }

  setLoginUserDetail(userData, isProxyUser) {
    if (isProxyUser) {
      // this.updateParentUserId(localStorage.getItem('userId'));
      // this.updateParentUserName(localStorage.getItem('username'));
      // localStorage.setItem('perentUserId', localStorage.getItem('userId'));
      // localStorage.setItem('perentUserName', localStorage.getItem('username'));
    }
    localStorage.setItem("access_token", userData.access_token);
    localStorage.setItem("expire_time", userData.expiuserData_in);
    localStorage.setItem("userId", userData.model.UserId);
    localStorage.setItem(
      "username",
      userData.model.FirstName + " " + userData.model.LastName
    );
    this.updateUserName(
      userData.model.FirstName + " " + userData.model.LastName
    );
    if (
      userData.model.ProfilePic !== null &&
      userData.model.ProfilePic !== ""
    ) {
      localStorage.setItem("avatar", userData.model.ProfilePic);
      this.updateUserImage(userData.model.ProfilePic);
    } else {
      localStorage.setItem("avatar", "assets/images/noUser.jpg");
      this.updateUserImage("assets/images/noUser.jpg");
    }
    localStorage.setItem("email", userData.model.UserName);
  }

  // update user name
  updateUserName(name: any) {
    this.userName.next(name);
  }

  // update user image
  updateUserImage(imageUrl: any) {
    this.userImage.next(imageUrl);
  }
  //################## Get User Subscription All Feature : End ################################################
}
