import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from '../comments/comments.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-view-one-recipe',
  imports: [CommonModule, CommentsComponent,NavbarComponent],
  templateUrl: './view-one-recipe.component.html',
  styleUrl: './view-one-recipe.component.css'
})
export class ViewOneRecipeComponent {
  recipe: any = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.apiService.getOneRecipe(recipeId).subscribe({
        next: (data) => {
          this.recipe = data;
        },
        error: (error) => {
          console.error('Error fetching recipe:', error);
        }
      });
    }
  }


}
