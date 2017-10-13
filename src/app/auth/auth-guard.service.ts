import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router,
  RouterStateSnapshot
} from "@angular/router";
import {JwtHelper} from "angular2-jwt";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  private jwtHelper: JwtHelper;
  redirectUrl: string;

  constructor(private router: Router) {
    this.jwtHelper = new JwtHelper();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    let token = localStorage.getItem('token');
    let role = localStorage.getItem('role');
    if (token && !this.jwtHelper.isTokenExpired(token) && role && role === 'admin') {
      return true;
    }

    this.redirectUrl = '/admin';
    this.router.navigateByUrl('/login');
    return false;
  }

  checkLogin(url: string): boolean {
    let token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    this.redirectUrl = url;
    this.router.navigateByUrl('/login');
    return false;
  }

  /**
   * 인증여부 체크: 로그인, 로그아웃 버튼 보여주기 등에 사
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    let token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  getMember() {
    if (localStorage.getItem('member')) {
      return JSON.parse(localStorage.getItem('member'));
    } else {
      return {};
    }
  }

  isAdmin() {
    if (localStorage.getItem('role') && localStorage.getItem('role') === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('member');
    localStorage.removeItem('role');
    this.redirectUrl = null;
    this.router.navigateByUrl('/');
  }

}
