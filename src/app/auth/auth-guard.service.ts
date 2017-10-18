import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router,
  RouterStateSnapshot
} from "@angular/router";
import {JwtHelper} from "angular2-jwt";
import {Observable} from "rxjs/Observable";
import {AppService} from "../app.service";
import {MemberVO} from "../domain/member.vo";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  private jwtHelper: JwtHelper;
  redirectUrl: string;

  constructor(private router: Router, private appService: AppService, public afAuth: AngularFireAuth) {
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
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      if (this.jwtHelper.decodeToken(token).subject.indexOf('admin') >= 0) {
        return true;
      }
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

  signUp(member: MemberVO) {
    this.appService.signUp(member)
      .then(res => {
        localStorage.setItem('token', res['token']);
        if (this.redirectUrl) {
          this.router.navigateByUrl(this.redirectUrl);
        } else {
          this.router.navigateByUrl('/');
        }
      });
  }

  login(member: MemberVO) {
    this.appService.login(member)
      .then(res => {
        localStorage.setItem('token', res['token']);
        if (this.redirectUrl) {
          this.router.navigateByUrl(this.redirectUrl);
        } else {
          this.router.navigateByUrl('/admin');
        }
      });
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
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      // console.log(this.jwtHelper.decodeToken(token));
      return this.jwtHelper.decodeToken(token).jti;
    } else {
      return {};
    }
  }

  isAdmin() {
    let token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      if (this.jwtHelper.decodeToken(token).subject.indexOf('admin') >= 0) {
        return true;
      }
    }
  }

  logOut() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('token');
    this.redirectUrl = null;
    this.router.navigateByUrl('/');
  }

}
