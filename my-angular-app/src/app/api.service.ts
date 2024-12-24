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

  // User registration
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data).pipe(
      catchError(this.handleError)  // Handle errors gracefully
    );
  }

  // User login
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`,data).pipe(
      catchError(this.handleError)  // Handle errors gracefully
    );
  }

  // User logout
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}).pipe(
      catchError(this.handleError)  // Handle errors gracefully
    );
  }

  // Fetch all recipes
  getRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes`).pipe(
      catchError(this.handleError)  // Handle errors gracefully
    );
  }

  // Create a new recipe
  createRecipe(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/recipes`, data).pipe(
      catchError(this.handleError)  // Handle errors gracefully
    );
  }

  // Update an existing recipe
  updateRecipe(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/recipes/${id}`, data).pipe(
      catchError(this.handleError)  // Handle errors gracefully
    );
  }

  // Delete a recipe
  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/recipes/${id}`).pipe(
      catchError(this.handleError)  // Handle errors gracefully
    );
  }

  // Error handler
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error.error.errors);  // Log error to console
    // Generate a more descriptive error message
    if(error.error.errors)
    {
      const errorMessage = error.error.errors ;
      return throwError(() => errorMessage);  // Return error message
    }else{
      return throwError(() => error.error);
    }
    // console.error('*',errorMessage)
  }
}
