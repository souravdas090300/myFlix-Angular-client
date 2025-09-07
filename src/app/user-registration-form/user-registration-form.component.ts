// src/app/user-registration-form/user-registration-form.component.ts
import { Component, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * User registration form component displayed as a modal dialog
 * Handles user input validation and registration API calls
 * Features form validation, error handling, and user feedback
 */
@Component({
  selector: 'app-user-registration-form',
  standalone: false,
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent {

  /** User input data binding for the registration form */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

/**
 * Constructor for UserRegistrationFormComponent
 * @param fetchApiData - Service for making API calls to the backend
 * @param dialogRef - Reference to the dialog for closing after successful registration
 * @param snackBar - Material snackbar service for displaying user notifications
 */
constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

/**
 * Handles user registration with form validation and API call
 * Validates required fields and email format before submitting
 * Displays success/error messages and closes dialog on success
 */
registerUser(): void {
    // Basic validation
    if (!this.userData.Username || !this.userData.Password || !this.userData.Email) {
      this.snackBar.open('Please fill in all required fields (Username, Password, Email)', 'OK', {
        duration: 3000
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.userData.Email)) {
      this.snackBar.open('Please enter a valid email address', 'OK', {
        duration: 3000
      });
      return;
    }

    // Prepare the data, ensuring the Birthday is formatted correctly
    const registrationData = {
      Username: this.userData.Username,
      Password: this.userData.Password,
      Email: this.userData.Email,
      Birthday: this.userData.Birthday ? new Date(this.userData.Birthday).toISOString().split('T')[0] : ''
    };
    
    // Log the data being sent to help debug
    console.log('Sending registration data:', registrationData);
    
    this.fetchApiData.userRegistration(registrationData).subscribe(() => {
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     this.snackBar.open('User registration successful! You can now log in.', 'OK', {
        duration: 2000
     });
    }, (error) => {
      console.error('Registration error:', error);
      console.error('Error details:', error.error);
      console.error('Status:', error.status);
      console.error('Status text:', error.statusText);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      this.snackBar.open(errorMessage, 'OK', {
        duration: 4000
      });
    });
  }
}