import { Component, inject } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { DataService } from '../Services/data.service';
import { Router } from '@angular/router';
import { validatePassword } from 'firebase/auth';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data=inject(DataService);
  router=inject(Router);
  formBuilder=inject(FormBuilder);
  passwordFieldType:any;
  loginForm:any;
  snackBar=inject(MatSnackBar)
  ngOnInit(){
    this.loginForm=this.formBuilder.group({
      userName:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    }) 
  }
  
  login(){
    const userData=Object.assign({email:this.loginForm.value.userName,password:this.loginForm.value.password})
this.data.signWithEmailAndPassword(userData).then((res:any)=>{
  this.snackBar.open('User Logged in Successfully','',{duration:2000});
  this.router.navigate(['/homepage']);

  console.log(res)

}).catch((error:any)=>{
  this.snackBar.open('User Not-Found','',{duration:2000});
})

  }

}
