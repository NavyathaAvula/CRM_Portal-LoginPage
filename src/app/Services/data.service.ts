import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  snackBar=inject(MatSnackBar);

  constructor(public firebase:AngularFireAuth, public router:Router) { }
  

  signWithEmailAndPassword(user:{email : string, password : string}) {
    console.log(this.firebase.signInWithEmailAndPassword(user.email,user.password))
    return this.firebase.signInWithEmailAndPassword(user.email,user.password);
  }

  // register method
  registerWithEmailAndPassword(user:{email : string, password : string}) {
    return this.firebase.createUserWithEmailAndPassword(user.email,user.password);
  }

  forgotPassword(email : string) {
    this.firebase.sendPasswordResetEmail(email).then(() => {
      this.snackBar.open('Email Send Successful','',{duration:2000});
      
    }, err => {
      this.snackBar.open('Something went Wrong','',{duration:2000});
    })
}

}
