// src/app/user-registration-form/user-registration-form.component.ts
import { Component, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used for navigation after registration
import { Router } from '@angular/router';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  standalone: false,
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    // Validate required fields
    if (!this.userData.Username || !this.userData.Password || !this.userData.Email) {
      this.snackBar.open('Please fill in all required fields (Username, Password, Email)', 'OK', {
        duration: 3000
      });
      return;
    }

    // Format the data to match API expectations - ensure all fields are strings
    const formattedUserData: any = {
      Username: this.userData.Username.trim(),
      Password: this.userData.Password,
      Email: this.userData.Email.trim().toLowerCase()
    };

    // Only add Birthday if it's provided and format it properly
    if (this.userData.Birthday) {
      // Ensure birthday is in the correct format (YYYY-MM-DD)
      const birthdayDate = new Date(this.userData.Birthday);
      if (!isNaN(birthdayDate.getTime())) {
        formattedUserData.Birthday = this.userData.Birthday;
      }
    }
    
    // Additional validation
    if (formattedUserData.Username.length < 3) {
      this.snackBar.open('Username must be at least 3 characters long', 'OK', {
        duration: 3000
      });
      return;
    }
    
    if (formattedUserData.Password.length < 5) {
      this.snackBar.open('Password must be at least 5 characters long', 'OK', {
        duration: 3000
      });
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formattedUserData.Email)) {
      this.snackBar.open('Please enter a valid email address', 'OK', {
        duration: 3000
      });
      return;
    }
    if (this.userData.Birthday) {
      formattedUserData.Birthday = this.userData.Birthday;
    }
    
    console.log('Sending registration data:', formattedUserData);
    
    this.fetchApiData.userRegistration(formattedUserData).subscribe((result: any) => {
      // Logic for a successful user registration goes here! (To be implemented)
      console.log('Registration successful:', result); // Add this to see the response in browser console
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('User registration successful! Please login.', 'OK', {
        duration: 3000
      });
      // Registration successful - stay on welcome page so user can login
    }, (error: any) => {
      console.error('Registration error details:', error); // Better error logging
      let errorMessage = 'Registration failed. Please try again.';
      
      // Handle CORS errors specifically
      if (error.status === 0 && error.error instanceof ProgressEvent) {
        errorMessage = 'Connection blocked by CORS policy. Please use the local development server (localhost:8080) for full functionality. The GitHub Pages version has CORS restrictions with the Heroku API.';
      } else if (error.status === 422) {
        console.log('Validation error details:', error.error);
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error && error.error.errors) {
          // Handle validation errors array
          const validationErrors = error.error.errors;
          if (Array.isArray(validationErrors)) {
            errorMessage = validationErrors.join(', ');
          } else {
            errorMessage = 'Validation error: ' + JSON.stringify(validationErrors);
          }
        } else {
          errorMessage = 'Please check that all fields are filled correctly. Username must be unique, password at least 5 characters, and email must be valid.';
        }
      } else if (error.status === 400) {
        errorMessage = 'Invalid data provided. Please check your input.';
      } else if (error.status === 409) {
        errorMessage = 'Username or email already exists. Please choose different ones.';
      } else if (error.status === 0) {
        errorMessage = 'Cannot connect to server. Please check your internet connection or use localhost:8080 for development.';
      }
      
      this.snackBar.open(errorMessage, 'OK', {
        duration: 8000
      });
    });
  }
}