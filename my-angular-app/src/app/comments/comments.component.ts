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

  fetchComments(): void {
    this.apiService.getCommentsByRecipeId(this.recipeId).subscribe(
      {
        next: (data) => { this.comments = data.comments; console.log(data.comments[0].commentedBy) },

        error: (error) => console.error('Error fetching comments', error)
      }
    );
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

  fetchRatings(): void {
    this.apiService.getRatingsByRecipeId(this.recipeId).subscribe(
      data => this.ratings = data.ratings,
      error => console.error('Error fetching ratings', error)
    );
  }

}

