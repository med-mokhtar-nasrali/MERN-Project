import { Component } from '@angular/core';
import { NewRes } from '../new-res';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormControl ,FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'; 
import {MatFormFieldModule} from '@angular/material/form-field';




@Component({
  selector: 'app-create-recipe',
  imports: [CommonModule, FormsModule, MatSelectModule,ReactiveFormsModule,MatFormFieldModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent {
  newRespi: NewRes = {}
  errorMessage: any = {}
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(private apiService: ApiService, private router: Router) {}
  addrecipe(): void {
    this.apiService.createRecipe(this.newRespi).subscribe({
      next: (res) => this.router.navigate(['/recipes']),
      error: (err) => console.log(err)
    })
  } 


}
