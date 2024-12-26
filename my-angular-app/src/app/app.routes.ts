import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatComponent } from './chat/chat.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { ErrComponent } from './err/err.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'porfil', component: ProfileComponent },
    { path: 'create', component: CreateRecipeComponent },
    { path: 'nav', component: NavbarComponent },
    { path: "chat/:id", component: ChatComponent },
    {path:"**",component:ErrComponent}

];

