import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:8000/api';  // Base URL for API

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getMessages(senderId: string, receiverId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/messages/${senderId}/${receiverId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  sendMessage(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/messages/${data.senderId}/${data.receiverId}`, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // User registration
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data).pipe(
      catchError(this.handleError)  // Handle errors gracefully
    );
  }

  // User login
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      catchError(this.handleError)  // Handle errors gracefully
    );
  }

  // User logout
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)  // Handle errors gracefully
    );
  }

  // Fetch all recipes
  getRecipes(): Observable<any> {
    const headers = this.getAuthHeaders(); // Add auth headers if required
    return this.http.get(`${this.baseUrl}/recipes`, { headers }).pipe(
      catchError(this.handleError)  // Handle errors gracefully
    );
  }

  // Create a new recipe
  createRecipe(data: any): Observable<any> {
    const headers = this.getAuthHeaders(); // Add auth headers if required
    return this.http.post(`${this.baseUrl}/recipes`, data, { headers }).pipe(
      catchError(this.handleError)  // Handle errors gracefully
    );
  }

  // Update an existing recipe
  updateRecipe(id: string, data: any): Observable<any> {
    const headers = this.getAuthHeaders(); // Add auth headers if required
    return this.http.put(`${this.baseUrl}/recipes/${id}`, data, { headers }).pipe(
      catchError(this.handleError)  // Handle errors gracefully
    );
  }

  // Delete a recipe
  deleteRecipe(id: string): Observable<any> {
    const headers = this.getAuthHeaders(); // Add auth headers if required
    return this.http.delete(`${this.baseUrl}/recipes/${id}`, { headers }).pipe(
      catchError(this.handleError)  // Handle errors gracefully
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error.error);
    let errorMessage = 'An unknown error occurred!';
    if (error.error.errors) {
      errorMessage = error.error.errors.join(', ') || 'Error occurred while processing your request.';
    } else if (error.error) {
      errorMessage = error.error.message || error.error;
    }
    return throwError(() => new Error(errorMessage));
  }
}
