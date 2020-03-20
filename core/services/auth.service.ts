import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { RouteConfig } from 'src/app/route.config';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  passwordHash: string;
  constructor(private http: HttpClient,
    private routeConfig: RouteConfig,
    private router: Router,
    private httpClient: HttpClientService,
    public jwtHelper: JwtHelperService) { }

  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }

  login() {
    // TODO : Add login service
  }

  logout() {
    // To log out, we just need to remove auth_token & role
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('uid');
  }
}
