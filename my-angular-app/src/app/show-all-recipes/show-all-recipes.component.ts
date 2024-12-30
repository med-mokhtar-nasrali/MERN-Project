import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from '../navbar/navbar.component';
import { ContacteComponent } from "../contacte/contacte.component";

@Component({
  selector: 'app-show-all-recipes',
  imports: [CommonModule, RouterLink, FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, NavbarComponent, ContacteComponent],
  templateUrl: './show-all-recipes.component.html',
  styleUrls: ['./show-all-recipes.component.css']
})
export class ShowAllRecipesComponent implements OnInit {

  recipes: any[] = [];
  private _filteredRecipes: any[] = [];
  searchText: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this._filteredRecipes = data; // Initialize with all recipes
      },
      error: (err) => console.error('Error fetching recipes', err)
    });
  }

  get filteredRecipes(): any[] {
    if (!this.searchText.trim()) {
      return this.recipes;
    }
    const searchWords = this.searchText.toLowerCase().split(' ');
    return this.recipes.filter(recipe =>
      searchWords.every(word =>
        recipe.recipeName.toLowerCase().includes(word) ||
        recipe.recipeType.toLowerCase().includes(word) ||
        recipe.recipeCategory.toLowerCase().includes(word) ||
        (recipe.recipeIngredients && recipe.recipeIngredients.some((ingredient: string) => ingredient.toLowerCase().includes(word)))
      )
    );
  }

  onSearchChange(): void {
    // This method can be used to trigger change detection
  }
}
