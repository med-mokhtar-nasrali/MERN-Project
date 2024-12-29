import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatComponent } from './chat/chat.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { ErrComponent } from './err/err.component';
import { ShowAllRecipesComponent } from './show-all-recipes/show-all-recipes.component';
import { ViewOneRecipeComponent } from './view-one-recipe/view-one-recipe.component';
import { CommentsComponent } from './comments/comments.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SelectComponent } from './select/select.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'create', component: CreateRecipeComponent },
    { path: 'nav', component: NavbarComponent },
    { path: "chat/:id", component: ChatComponent },
    { path: "recipes", component: ShowAllRecipesComponent },
    { path: "recipes/:id", component: ViewOneRecipeComponent },
    { path: "recipes/:id/comments", component: CommentsComponent },
    { path: "recipes/:id/ratings", component: CommentsComponent },
    //  {path:"**",component:ErrComponent},
    { path: "recipes/:id/delete", component: CommentsComponent },
    { path: "admin", component: AdminDashboardComponent },
    {
        path:"selct",component:SelectComponent
    }



]; 