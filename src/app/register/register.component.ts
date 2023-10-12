import { Component,inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { validatePassword } from 'firebase/auth';
import { __await } from 'tslib';
import { initializeApp } from 'firebase/app';
import { getFirestore,collection,getDocs} from 'firebase/firestore';
import { addDoc } from "firebase/firestore"; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
a=true;
router=inject(Router);
data=inject(DataService);
registerForm:any;
formBuilder=inject(FormBuilder);
snackBar=inject(MatSnackBar)

ngOnInit() :void{
  this.registerForm=this.formBuilder.group(
    {
      firstName:['',[Validators.required,Validators.maxLength(14),this.alpha]],
      lastName:['',[Validators.required,Validators.maxLength(14)]],
      email:['',[Validators.required,Validators.email]]||LowerCasePipe,
      phoneNumber:['',[Validators.required,this.num,Validators.minLength(1),Validators.maxLength(10)]],
      password:['',[Validators.required,Validators.minLength(8),this.num,this.lower,this.upper,this.specialChar,Validators.maxLength(20)]],
      confirmPassword:['',[Validators.required,Validators.minLength(8),this.num,this.lower,this.upper,this.specialChar,Validators.maxLength(20)]]
   
    })
}
alpha(c:FormControl){
  let patter=/[a-z A-Z]/
  if(patter.test(c.value)){
    return null;
  }
  else{
    return {'num':true}
  }
}
num(c:FormControl){
  let patter=/[0-9]/
  if(patter.test(c.value)){
    return null;
  }
  else{
    return {'num':true}
  }
}
upper(c:FormControl){
  let patter=/[A-Z]/
  if(patter.test(c.value)){ return null}
  else{ return {'upper':true}}
}

lower(c:FormControl){
  let patter=/[a-z]/
  if(patter.test(c.value)){ return null}
  else{ return {'lower':true}}
}

specialChar(c:FormControl){
  let patter=/[!@#$%&*()-+=^]/
  if(patter.test(c.value)){ return null}
  else{ return {'specialChar':true}}
}
async aa() 
{

  const docRef = await addDoc(collection(db, "Register"), {
    firstName: this.registerForm.value.firstName ,
    lastName: this.registerForm.value.lastName ,
    phoneNumber: this.registerForm.value.phoneNumber ,
    email: this.registerForm.value.email ,
    active: this.a
  });    
  console.log("Document written with ID: ", docRef.id);
} 


register() {
if(this.registerForm.value.password!=this.registerForm.value.confirmPassword){
  this.snackBar.open('Password and Confirm Password are NOT MATCHED','',{duration:2000});
  this.registerForm.password="";
  this.registerForm.confirmPassword="";
}
else{
    const userData=Object.assign(this.registerForm.value)
  this.data.registerWithEmailAndPassword(userData).then((res:any)=>{
    this.aa();
    this.router.navigate(['/']);
    this.snackBar.open('User Registered Successfully','',{duration:2000});
  }).catch((error:any)=>{
    console.log("error");
    this.snackBar.open('Something went Wrong','',{duration:2000});
  })
}
    }
}