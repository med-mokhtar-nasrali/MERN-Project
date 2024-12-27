import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | null = null;

  private readonly SERVER_URL = 'http://localhost:8000';

  constructor() {}

  connect(token: string, room: string): void {
    if (!this.socket) {
      this.socket = io(this.SERVER_URL, {
        auth: { token },
      });

      // Join the specified room
      this.socket.emit('join_room', room);
    } else {
      // If already connected, join the room
      this.socket.emit('join_room', room);
    }
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  emit(event: string, data: any): void {
    this.socket?.emit(event, data);
  }

  on(event: string, callback: (data: any) => void): void {
    this.socket?.on(event, callback);
  }

  off(event: string): void {
    this.socket?.off(event);
  }
}
