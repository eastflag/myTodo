import { Component, OnInit } from '@angular/core';
import {MemberVO} from "../../domain/member.vo";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  member = new MemberVO();

  constructor(public afAuth: AngularFireAuth) { }

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
        console.log(data);
        console.log(data.user.displayName, data.user.email, data.user.photoURL, data.user.phoneNumber);
      });
  }

  /**
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
