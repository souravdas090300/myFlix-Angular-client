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

    // Format the data to match API expectations - try different field name casing
    const formattedUserData: any = {
      Username: this.userData.Username.trim(),
      Password: this.userData.Password,
      Email: this.userData.Email.trim()
    };

    // Only add Birthday if it's provided
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
      
      // Try to extract specific error message from API response
      if (error && error.error && typeof error.error === 'object') {
        if (error.error.message) {
          errorMessage = error.error.message;
        } else if (error.error.errors) {
          errorMessage = 'Validation errors: ' + JSON.stringify(error.error.errors);
        }
      }
      
      this.snackBar.open(errorMessage, 'OK', {
        duration: 5000
      });
    });
  }
}