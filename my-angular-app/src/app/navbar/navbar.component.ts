import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../home/home.component.css']
})
export class NavbarComponent implements OnInit {
  currentUserRole: string | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentUserRole = localStorage.getItem('userRole');
    console.log('Current user role:', this.currentUserRole);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Adjust based on your authentication logic
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.router.navigate(['/']);
  }
}
