import { Component,ViewChild,inject } from '@angular/core';
import { DataService } from '../Services/data.service';
import { FormBuilder, Validators } from '@angular/forms';

import { initializeApp } from 'firebase/app';
import { getFirestore,collection,getDocs} from 'firebase/firestore';
import { addDoc } from "firebase/firestore"; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const firebaseConfig = { 
  apiKey: "AIzaSyCFcLcMUb1uJukPeHHXPAnvwqswqevMjq0",
  authDomain: "angularcrm-test.firebaseapp.com",
  projectId: "angularcrm-test",
  storageBucket: "angularcrm-test.appspot.com",
  messagingSenderId: "491979248592",
  appId: "1:491979248592:web:2962b29dc7b0f087849fd5",
  measurementId: "G-YFWZKY98Y2"};
  const app = initializeApp(firebaseConfig);
  const db=getFirestore(app);
  


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  data=inject(DataService)
  snackBar=inject(MatSnackBar)
  resetForm:any;
  checkEmail:any;
  formBuilder=inject(FormBuilder)
  router=inject(Router)
@ViewChild('a')b:any;
async ngOnInit(){
  this.resetForm=this.formBuilder.group({

    emailid:['',[Validators.required,Validators.email]]
  })

  //get data from firebase
  const a=await getDocs(collection(db,'Register'));
  const data = a.docs.map(doc => doc.data());
  this.checkEmail=data;
  console.log(this.checkEmail)
}


  reset(){
   const d= this.checkEmail.filter((u:any)=>u.email==this.resetForm.value.emailid)
   console.log(d)
  //  console.log(din[0].email)
  if(d.length==1){
   if(d[0].email==this.resetForm.value.emailid){
    this.data.forgotPassword(this.resetForm.value.emailid);
    this.router.navigate(['/mailsend'])
   }}
   else{
    this.snackBar.open('User does not Exit Or Invalid Email id','',{duration:2000});
   }

   }
}
