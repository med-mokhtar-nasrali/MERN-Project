import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';  // Import ActivatedRoute for route parameters
import { ApiService } from '../api.service';  // Assuming you have an ApiService for HTTP calls
import { Socket } from 'ngx-socket-io';  // Using ngx-socket-io for WebSocket in Angular
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  
}