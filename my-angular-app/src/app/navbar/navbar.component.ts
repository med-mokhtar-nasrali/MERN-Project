import { Component } from '@angular/core'
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';


@Component({
  selector: 'app-navbar',
  imports: [CreateRecipeComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css','../home/home.component.css']
})
export class NavbarComponent {

}
