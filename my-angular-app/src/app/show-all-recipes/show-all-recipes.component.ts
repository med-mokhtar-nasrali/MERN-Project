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


@Component({
  selector: 'app-show-all-recipes',
  imports: [CommonModule, RouterLink, FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './show-all-recipes.component.html',
  styleUrls: ['./show-all-recipes.component.css']
})
export class ShowAllRecipesComponent implements OnInit {

  recipes: any[] = [];
  filteredRecipes: any[] = [];
  searchText: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this.filteredRecipes = data; // Initialize with all recipes
      },
      error: (err) => console.error('Error fetching recipes', err)
    });
  }

  onSearchChange(): void {
    const searchWords = this.searchText.toLowerCase().split(' ');
    this.filteredRecipes = this.recipes.filter(recipe =>
      searchWords.every(word =>
        recipe.recipeName.toLowerCase().includes(word) ||
        recipe.recipeType.toLowerCase().includes(word) ||
        recipe.recipeCategory.toLowerCase().includes(word) ||
        recipe.recipeIngredients.some((recipeIngredients: string) => recipeIngredients.toLowerCase().includes(word)
        )
      ));
  }
}
