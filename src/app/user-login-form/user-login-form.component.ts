// src/app/user-login-form/user-login-form.component.ts
import { Component, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// This import is used for navigation after login
import { Router } from '@angular/router';

/**
 * User login form component displayed as a modal dialog
 * Handles user authentication and navigation to the movie list upon successful login
 * Stores JWT token and user data in localStorage for session management
 */
@Component({
  selector: 'app-user-login-form',
  standalone: false,
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {

  /** User input data binding for the login form (Username and Password) */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Constructor for UserLoginFormComponent
   * @param fetchApiData - Service for making API calls to the backend
   * @param dialogRef - Reference to the dialog for closing after successful login
   * @param snackBar - Material snackbar service for displaying user notifications
   * @param router - Angular router service for navigation after login
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  /**
   * Handles user login authentication
   * Stores JWT token and user data in localStorage upon successful login
   * Navigates to movies page and closes the dialog
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // Logic for a successful user login goes here! (To be implemented)
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('User login successful', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (error) => {
      console.error('Login error:', error);
      const errorMessage = error.error?.message || error.message || 'Login failed. Please check your credentials.';
      this.snackBar.open(errorMessage, 'OK', {
        duration: 2000
      });
    });
  }
}
