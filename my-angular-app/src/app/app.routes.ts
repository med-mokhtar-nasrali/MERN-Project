import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AllPostComponent } from './all-post/all-post.component';
import { ChowOneComponent } from './chow-one/chow-one.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [  
    {path:'',component:HomeComponent} ,
    {path:'login',component:LoginComponent} ,
    {path:'signup',component:SignUpComponent},
    {path:'porfil',component:ProfileComponent}, 
    {path:'create',component:CreateComponent}, 
    {path:'nav',component:NavbarComponent}, 
    { path:'all-post',component:AllPostComponent},
    {path:"show",component:ChowOneComponent}
,{path:"chat/:id",component: ChatComponent}

]; 

