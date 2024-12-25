import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChatComponent } from './chat/chat.component';
export const routes: Routes = [  
    {path:'',component:HomeComponent} ,
    {path:'login',component:LoginComponent} ,
    {path:'signup',component:SignUpComponent} ,
    {path:'chat/:id',component:ChatComponent}
];
