import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { io } from 'socket.io-client';  // Import the Socket.IO client
import { Subscription } from 'rxjs';  // Import Subscription to manage the observable
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  message = { senderId: '', receiverId: '', message: '', isSender: true };  // Add 'isSender' for message ownership
  messages: any[] = [];
  loading: boolean = false;
  error: string = '';
  socket: any;
  socketSubscription?: Subscription;
  room: string = '';  // Room identifier (e.g., sender and receiver IDs)

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get sender ID from local storage
    const senderId = localStorage.getItem('userId');
    if (senderId) {
      this.message.senderId = senderId;
    } else {
      this.router.navigate(['/login']); // Redirect to login if no user ID is found
      return; // Prevent further execution if senderId is not available
    }

    // Get receiver ID from route parameters
    this.route.params.subscribe((params) => {
      this.message.receiverId = params['id'];
      // Create a room name based on user IDs (unique for the two users)
      this.room = [this.message.senderId, this.message.receiverId].sort().join('_');
      this.fetchChatHistory(); // Fetch chat history
      this.initializeSocketConnection();
    });
  }

  // Initialize the Socket.IO connection and listen for messages
  initializeSocketConnection(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.socket = io('http://localhost:8000', {
        auth: { token }, // Pass the JWT token for authentication
      });

      // Join the chat room based on user IDs (only two users will join the room)
      this.socket.emit('join_room', this.room);

      // Listen for incoming messages from other users in the same room
      this.socketSubscription = this.socket.on('chat_message', (msgData: any) => {
        console.log('Received message:', msgData);

        // If the message is not sent by the current user, show it as received
        if (msgData.sender_id !== this.message.senderId) {
          this.messages.push({ ...msgData, isSender: false }); // Add the incoming message as received
          this.scrollToBottom(); // Scroll to the bottom when a new message is received
        }
      });
    } else {
      this.router.navigate(['/login']); // Redirect if no token is found
    }
  }

  // Fetch chat history from the API
  fetchChatHistory(): void {
    this.apiService.getMessages(this.message.senderId, this.message.receiverId).subscribe({
      next: (response: any) => {
        this.messages = response.map((msg: any) => ({
          ...msg,
          isSender: msg.senderId === this.message.senderId, // Mark if it's a sent message
        })) || [];
      },
      error: (err) => {
        console.error('Error fetching chat history:', err);
        this.error = 'Failed to load chat history. Please try again later.';
      },
    });
  }

  // Add a new message to the chat and send it to the server
  addMessage(): void {
    if (!this.message.message.trim()) {
      return; // Prevent sending empty messages
    }

    this.loading = true; // Show loading indicator

    // Create the message to send (mark it as sent)
    const sentMessage = { ...this.message, isSender: true };

    // Emit the message to the backend
    this.apiService.sendMessage(this.message).subscribe({
      next: (response: any) => {
        // Emit the message to the Socket.IO server for the room
        this.socket.emit('chat_message', {
          room: this.room,  // Specify the room to broadcast to (only to the sender and receiver)
          receiver_id: this.message.receiverId,
          sender_id: this.message.senderId,
          message: this.message.message,
        });
        console.log('Message sent:', this.message.message);

        // Add the message to the local chat display (sender's side)
        this.messages.push(sentMessage);

        // Clear the input field and stop loading indicator
        this.message.message = '';
        this.loading = false;
        this.scrollToBottom(); // Scroll to the bottom immediately after sending
      },
      error: (err) => {
        console.error('Error sending message:', err);
        this.loading = false;
        this.error = 'Failed to send message. Please try again later.';
      },
    });
  }

  // Scroll to the bottom of the chat container when a new message arrives
  scrollToBottom(): void {
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 0); // Timeout ensures that the DOM updates first
  }

  // Cleanup socket connection and subscription when the component is destroyed
  ngOnDestroy(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
