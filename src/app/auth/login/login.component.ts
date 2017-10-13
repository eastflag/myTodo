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
      });
  }
}
