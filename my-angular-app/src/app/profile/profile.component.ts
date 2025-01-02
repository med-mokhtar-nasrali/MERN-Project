import { Component, OnInit } from '@angular/core';
import { EditeComponent } from '../edite/edite.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-profile',
  imports: [EditeComponent, RouterModule, NavbarComponent, CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../profile/profile.component.css']



})
export class ProfileComponent implements OnInit {

  currentUser: any = null; // Add a property for the current user
  userRecipes: any[] = []; // Add a property for the user's recipes
  messages: any[] = []; // Add a property for the user's messages
  conversationsId: string[] = [];
  conversations: any[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
    if (userId) {
      this.fetchCurrentUser(userId);
      this.fetchUserRecipes(userId);
      //get converstion
      console.log(userId);
      this.apiService.getConversation(userId).subscribe({
        next: (data) => {
          this.messages = data;
          console.log('Fetched conversation:', data);
          this.conversationsId = this.getConversations(data);
          console.log('Conversations:', this.conversationsId);
          this.conversationsId.forEach((id) => {
            if (id !== userId) {
              this.apiService.getUserById(id).subscribe({
                next: (data) => {
                  console.log('Fetched user:', data);
                  this.conversations.push(data);
                  console.log('Conversations:', this.conversations);        
                },
                error: (error) => {
                  console.error('Error fetching user:', error);
                }
              });
            }
          });
        },
        error: (error) => {
          console.error('Error fetching conversation:', error);
        }
      });
    }
  }

  getConversations(data: any[]): string[] {
    let result: string[] = [];
    data.forEach((message) => {
      if (!result.includes(message.sender_id._id)) {
        result.push(message.sender_id._id);
      }
      if (!result.includes(message.receiver_id._id)) {
        result.push(message.receiver_id._id);
      }
    });


    return result;
  }

  fetchCurrentUser(userId: string): void {
    this.apiService.getUserById(userId).subscribe(
      data => {
        console.log('Fetched current user:', data);
        this.currentUser = data;
      },
      error => console.error('Error fetching current user', error)
    );
  }

  fetchUserRecipes(userId: string): void {
    this.apiService.getRecipesByUserId(userId).subscribe(
      data => {
        console.log('Fetched user recipes:', data);
        this.userRecipes = data;
      },
      error => console.error('Error fetching user recipes', error)
    );
  }
}