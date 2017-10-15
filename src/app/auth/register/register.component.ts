import { Component, OnInit } from '@angular/core';
import {MemberVO} from "../../domain/member.vo";
import {AngularFireAuth} from "angularfire2/auth";
import {MdSnackBar} from "@angular/material";
import {AuthGuardService} from "../auth-guard.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email = null;
  pw = null;

  constructor(public afAuth: AngularFireAuth, private snackBar: MdSnackBar, private authService: AuthGuardService) { }

  ngOnInit() {
  }

  signupWithPassword() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.pw)
      .then(data => {
        console.log(data);
        let member = new MemberVO();
        member.email = data.email;
        member.name = data.displayName;
        member.photo_url = data.photoURL;
        member.phone = data.phone;
        this.authService.signUp(member);
      })
      .catch(error => {
        console.log(error);
        this.snackBar.open(error.message, null, {
          duration: 3000,
        });
      });
  }

  /**
   * auth/email-already-in-use
   * message: "The email address is already in use by another account."
   *
   * auth/weak-password
   * Password should be at least 6 characters
   */
}
