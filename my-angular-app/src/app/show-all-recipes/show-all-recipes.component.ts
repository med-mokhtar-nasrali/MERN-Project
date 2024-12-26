import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-show-all-recipes',
  imports: [CommonModule, RouterLink],
  templateUrl: './show-all-recipes.component.html',
  styleUrl: './show-all-recipes.component.css'
})
export class ShowAllRecipesComponent {

  recipes: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
      }
    });
  }

}
