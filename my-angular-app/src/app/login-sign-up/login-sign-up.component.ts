import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login-sign-up',
  imports: [LoginComponent],
  templateUrl: './login-sign-up.component.html',
  styleUrl: './login-sign-up.component.css'
})
export class LoginSignUpComponent { 


}
