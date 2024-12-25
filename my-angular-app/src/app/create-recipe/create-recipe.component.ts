import { Component } from '@angular/core';
import { NewRes } from '../new-res';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-recipe',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent {
newRespi: NewRes = {}
  errorMessage: any = {}

  constructor(private apiService: ApiService, private router: Router) {}

  addrecipe(): void {
    this.apiService.createRecipe(this.newRespi).subscribe({
      next: (res) => this.router.navigate(['/all-post']),
      error: (err) => console.log(err)
    })
  }

}
