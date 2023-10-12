import { Component,inject } from '@angular/core';
import emailjs from '@emailjs/browser';
import { __await } from 'tslib';
import { initializeApp } from 'firebase/app';
import { getFirestore,collection,getDocs} from 'firebase/firestore';
import { addDoc } from "firebase/firestore"; 
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

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
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm:any;
  formBuilder=inject(FormBuilder);
  db:any
  date = new Date()
  din:any;
  snackBar=inject(MatSnackBar);
  spinner=0;
 async ngOnInit()
 {
   this.contactForm=this.formBuilder.group({
    name:['',[Validators.required,Validators.maxLength(25),Validators.minLength(3)]],
    phoneNo:['',[Validators.required,Validators.minLength(9),Validators.maxLength(10),this.number]],
    email:['',[Validators.required,Validators.email]],
    textarea:['',[Validators.required]],
    or:['',Validators.required],
    role:['',Validators.required]
  })
 }

 number(c:FormControl){
  let pattern=/[0-9]/
  if(pattern.test(c.value)){
    return null
  }
  else{
    return {'num':true}
  }
 }

  async writeIntoDataBase()
  {
    this.spinner=1;
   // store in fire base
    // const docRef = await addDoc(collection(db, "ContactUs"), {
    //   fullName: this.contactForm.value.name ,
    //   phoneNo: this.contactForm.value.phoneNo,
    //   email: this.contactForm.value.email ,
    //   textarea: this.contactForm.value.textarea ,
    //   org: this.contactForm.value.or ,
    //   role:this.contactForm.value.role 
    // });    

   //send to customer
   emailjs.init('-EKMIaIJKdPWy1ba8');
   let response=await emailjs.send("service_rean5cr","template_a45et0c",{
    customers_name: this.contactForm.value.name,
    customers_full_name: this.contactForm.value.name,
    customers_email_address: this.contactForm.value.email,
    customers_phone_number: this.contactForm.value.phoneNo,
    name_of_mobile_app: this.contactForm.value.or,
    reply_to: this.contactForm.value.email,
    });
      //send to coustomer representative
      emailjs.init('-EKMIaIJKdPWy1ba8');
      let responsee=await emailjs.send("service_rean5cr","template_8bf5orc",{
         customers_name: this.contactForm.value.name,
         customer_email_address: this.contactForm.value.email,
         customer_phone_number: this.contactForm.value.phoneNo,
         name_of_mobile_app: this.contactForm.value.or,
         dis: this.contactForm.value.textarea,
         reply_to: "navyathaavula@gmail.com",
         });
         this.spinner=0;
    this.contactForm.reset();
    this.snackBar.open('Successfully Send','',{duration:5000});   
  }

}
