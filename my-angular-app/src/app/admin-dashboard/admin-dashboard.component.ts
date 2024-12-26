import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  users: any[] = [];
  currentUserRole: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Assume the role is stored in local storage or obtained after login
    this.currentUserRole = localStorage.getItem('userRole');
    console.log('Current user role:', this.currentUserRole);

    if (this.currentUserRole === 'admin') {
      this.fetchUsers();
    } else {
      console.error('Access denied. Admins only.');
      alert('Access denied. Admins only.');
    }
  }

  fetchUsers(): void {
    this.apiService.getAllUsersAdmin().subscribe(
      data => {
        console.log('Fetched users:', data);
        this.users = data;
      },
      error => console.error('Error fetching users', error)
    );
  }
}