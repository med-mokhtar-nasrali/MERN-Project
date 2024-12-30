import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';  // Import Subscription to manage the observable
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketService } from '../socket.service';

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
  socketSubscription?: Subscription;
  room: string = '';  // Room identifier (e.g., sender and receiver IDs)

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    const senderId = localStorage.getItem('userId');
    if (senderId) {
      this.message.senderId = senderId;
    } else {
      this.router.navigate(['/login']);
      return;
    }

    this.route.params.subscribe((params) => {
      this.message.receiverId = params['id'];
      this.room = `${this.message.senderId}-${this.message.receiverId}`;
      this.fetchChatHistory();
      this.initializeSocketConnection();
    });
  }
  
  // Initialize the Socket.IO connection and listen for messages
  initializeSocketConnection(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.socketService.connect(token, this.room);

      // Listen for incoming messages from other users
      this.socketService.on('chat_message', (msgData: any) => {
        console.log(`Message received from ${msgData.sender_id}: ${msgData.message}`);
        this.messages.push({
          senderId: msgData.sender_id,
          message: msgData.message,
          timestamp: this.formatTimestamp(msgData.timestamp),
          isSender: msgData.sender_id === this.message.senderId,
        });
        this.scrollToBottom();
      });

      // Handle reconnections
      this.socketService.on('reconnect', () => {
        console.log('Reconnected to the server');
        this.socketService.emit('join_room', this.room); // Rejoin the room on reconnect
      });

      // Handle disconnections
      this.socketService.on('disconnect', () => {
        console.log('Disconnected from the server');
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Fetch chat history from the API
  fetchChatHistory(): void {
    this.loading = true;  // Set loading to true before the request
    this.apiService.getMessages(this.message.senderId, this.message.receiverId).subscribe({
      next: (response: any) => {
        this.messages = response.map((msg: any) => ({
          ...msg,
          isSender: msg.senderId === this.message.senderId,
          timestamp: this.formatTimestamp(msg.timestamp), // Format timestamp
        })) || [];
        this.loading = false;  // Set loading to false after response
      },
      error: (err) => {
        console.error('Error fetching chat history:', err);
        this.error = 'Failed to load chat history. Please try again later.';
        this.loading = false;  // Set loading to false if error occurs
      },
    });
  }

  // Add a new message to the chat and send it to the server
  addMessage(): void {
    if (!this.message.message.trim()) {
      return;
    }

    this.loading = true;

    const sentMessage = { ...this.message, isSender: true };
    const timestamp = new Date().toISOString();

    // Emit the message to the backend
    this.socketService.emit('chat_message', {
      room: this.room,
      sender_id: this.message.senderId,
      message: this.message.message,
      timestamp: timestamp,
    });

    // Display the message immediately for the sender
    this.messages.push({ ...sentMessage, timestamp });
    this.message.message = '';
    this.loading = false;
    this.scrollToBottom();

    // Send the message to the server
    this.apiService.sendMessage(this.message).subscribe({
      next: (response: any) => {
        console.log('Message sent successfully');
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
      const chatContainer = document.getElementById('sender');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 0);
  }

  // Format timestamp to a readable time string
  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleTimeString();
  }

  // Cleanup socket connection and subscription when the component is destroyed
  ngOnDestroy(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
    this.socketService.disconnect();
  }
}
