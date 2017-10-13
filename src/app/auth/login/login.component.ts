import { Component, OnInit } from '@angular/core';
import {MemberVO} from "../../domain/member.vo";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  member = new MemberVO();

  authState: Observable<firebase.User>;
  currentUser: firebase.User = null;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        console.log(this.currentUser);
      } else {
        this.currentUser = null;
      }
    });
  }

  ngOnInit() {
  }

  loginWithPassword() {
    this.afAuth.auth.signInWithEmailAndPassword(this.member.email, this.member.pw)
      .then(data => {
        console.log(data);
      });
  }

  loginWithFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(data => {
        console.log(data);
      });
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(data => {
        // console.log(data);
        // console.log(data.user.displayName, data.user.email, data.user.photoURL, data.user.phoneNumber);
      });
  }

  gotoRegister() {
    this.router.navigateByUrl('/register');
  }

  /**
   * https://medium.com/letsboot/lets-learn-how-to-install-and-setup-angularfire2-4-0-135d72bb0a41
   *
   * - 로그인
   code: auth/user-not-found
   message: There is no user record corresponding to this identifier. The user may have been deleted

   code:auth/wrong-password
   message: the password is invalid or the user does not have password
   => 패스워드 틀림

   operationType: "signIn"
   user.displayName: "dong kee lee"
   user.email:
   user.phoneNumber:
   user.photoURL: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
   */
}
