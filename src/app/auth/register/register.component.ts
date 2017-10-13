import { Component, OnInit } from '@angular/core';
import {MemberVO} from "../../domain/member.vo";
import {AngularFireAuth} from "angularfire2/auth";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  member = new MemberVO();

  constructor(public afAuth: AngularFireAuth, private snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  signupWithPassword() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.member.email, this.member.pw)
      .then(data => {
        console.log(data);
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
   */
}
