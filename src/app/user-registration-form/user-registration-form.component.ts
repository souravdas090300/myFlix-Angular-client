// src/app/user-registration-form/user-registration-form.component.ts
import { Component, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

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
    public snackBar: MatSnackBar) { }

// This is the function responsible for sending the form inputs to the backend
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