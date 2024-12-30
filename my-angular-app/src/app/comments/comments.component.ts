import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-comments',
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }
  recipeId!: string;
  comments: any[] = [];
  newComment: string = ""
  ratings: any[] = [];
  ratings1: any[] = [];
  ratingValue: number = 0;


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { // Check if id is not null
      this.recipeId = id;
      this.fetchComments();
      this.fetchRatings();
    } else {
      console.error('Recipe ID is null');
      // Handle the case where the recipe ID is null
    }
  }

  async fetchComments(): Promise<void> {
    try {
      const data = await this.apiService.getCommentsByRecipeId(this.recipeId).toPromise();
      this.comments = data.comments; console.log(data.comments[0].commentedBy);
      await this.fetchRatings(); console.log("ratingss", this.ratings);
      for (let index = 0; index < this.comments.length; index++) {
        const element = this.comments[index].rating = this.ratings[index].ratingValue;

      }
    }
    catch (error) { console.error('Error fetching comments', error); }
  }

  submitComment(): void {
    const commentData = { commentMessage: this.newComment };
    this.apiService.addCommentToRecipe(this.recipeId, commentData).subscribe(
      {
        next: (data) => {
          this.comments.push(data.comment);
          this.newComment = ''; // Clear the input field
        },
        error: (error) => console.error('Error submitting comment', error)
      }
    );
  }

  submitRating(): void {
    const ratingData = { ratingValue: this.ratingValue };
    this.apiService.addRatingToRecipe(this.recipeId, ratingData).subscribe(
      data => {
        this.ratings.push(data.rating);
        this.ratingValue = 0; // Clear the rating input
      },
      error => console.error('Error submitting rating', error)
    );
  }

  async fetchRatings(): Promise<void> {
    try {
      const data = await this.apiService.getRatingsByRecipeId(this.recipeId).toPromise();
      this.ratings = data.ratings;
    }
    catch (error) { console.error('Error fetching ratings', error); }
  }

  deleteRecipe(): void {
    this.apiService.deleteOneRecipe(this.recipeId).subscribe(
      () => {
        console.log('Recipe deleted successfully');
        // Add any additional logic, e.g., redirecting the user
      },
      error => console.error('Error deleting recipe', error)
    );
  }

}

