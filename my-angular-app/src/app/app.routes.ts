import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [  
    {path:'',component:HomeComponent} ,
    {path:'login',component:LoginComponent} ,
    {path:'singup',component:SignUpComponent},  
    {path:'porfile',component:ProfileComponent}, 
];
