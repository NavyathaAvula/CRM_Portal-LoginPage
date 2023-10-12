import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactComponent } from './contact/contact.component'
import { ResetMailSendComponent } from './reset-mail-send/reset-mail-send.component';

const routes: Routes = [
  {path:'', component:LoginComponent,title:'LoginPage'},
  {path:'reset-password',component:ResetPasswordComponent,title:'ResetPassword'},
  {path:'register',component:RegisterComponent, title:'Register'},
  {path:'homepage',component:HomePageComponent, title:'HomePage'},
  {path:'contact',component:ContactComponent, title:'contact'},
  {path:'mailsend',component:ResetMailSendComponent, title:'MailSend'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
