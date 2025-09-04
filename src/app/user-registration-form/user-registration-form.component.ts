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
    this.fetchApiData.userRegistration(this.userData).subscribe((result: any) => {
      // Logic for a successful user registration goes here! (To be implemented)
      console.log(result); // Add this to see the response in browser console
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('User registration successful! Please login.', 'OK', {
        duration: 3000
      });
      // Registration successful - stay on welcome page so user can login
    }, (result: any) => {
      console.log(result); // Add this to see the error in browser console
      this.snackBar.open('Registration failed. Please try again.', 'OK', {
        duration: 2000
      });
    });
  }
}