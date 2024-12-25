import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
<<<<<<< HEAD
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
=======
import { AllPostComponent } from './all-post/all-post.component';
import { ChowOneComponent } from './chow-one/chow-one.component';
import { ChatComponent } from './chat/chat.component';
>>>>>>> 821295186ba6ba937cfbf32a2dcd6002e2592c4d

export const routes: Routes = [  
    {path:'',component:HomeComponent} ,
    {path:'login',component:LoginComponent} ,
    {path:'signup',component:SignUpComponent},
    {path:'porfil',component:ProfileComponent}, 
    {path:'create',component:CreateRecipeComponent}, 
    {path:'nav',component:NavbarComponent}, 
<<<<<<< HEAD
   
=======
    { path:'all-post',component:AllPostComponent},
    {path:"show",component:ChowOneComponent}
,{path:"chat/:id",component: ChatComponent}
>>>>>>> 821295186ba6ba937cfbf32a2dcd6002e2592c4d

]; 

