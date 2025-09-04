// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RegistrationSuccessDialogComponent } from '../registration-success-dialog/registration-success-dialog.component';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
import { ApiConfigService } from '../api-config.service';
import { BackendHealthService } from '../backend-health.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration-form',
  standalone: false,
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public apiConfig: ApiConfigService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private backendHealth: BackendHealthService) { }

  ngOnInit(): void {
    // Initialize component - can be used for any setup logic
    console.log('UserRegistrationFormComponent initialized');
  }

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    console.log('Starting registration process...');
    
    // Validate form data before sending
    if (!this.userData.Username || !this.userData.Password || !this.userData.Email) {
      this.snackBar.open('Please fill in all required fields', 'OK', { duration: 3000 });
      return;
    }
    
    if (this.userData.Username.length < 3) {
      this.snackBar.open('Username must be at least 3 characters long', 'OK', { duration: 3000 });
      return;
    }
    
    if (this.userData.Password.length < 6) {
      this.snackBar.open('Password must be at least 6 characters long', 'OK', { duration: 3000 });
      return;
    }
    
    this.attemptRegistration();
  }

  private attemptRegistration(): void {
    // Use the API config service which will automatically use mock API if backend is having issues
    this.apiConfig.userRegistration(this.userData).subscribe((result) => {
      console.log('Registration successful:', result);
      // Close registration dialog and show confirmation
      this.dialogRef.close();
      this.dialog.open(RegistrationSuccessDialogComponent, {
        width: '320px',
        data: { Username: this.userData.Username, message: (result && result.message) ? result.message : 'Registration successful' }
      });

      // Attempt to log in automatically so the user sees the movie list immediately
      console.log('Attempting auto-login after registration...');
      this.fetchApiData.userLogin({ Username: this.userData.Username, Password: this.userData.Password }).subscribe({
        next: (loginResp) => {
          console.log('Auto-login successful after registration:', loginResp);
          // Check if we got a token
          if (loginResp && loginResp.token) {
            console.log('Token received, navigating to movies page');
            this.router.navigate(['movies']);
          } else {
            console.log('No token in login response, staying on welcome page');
            this.snackBar.open('Registration successful. Please log in to view movies.', 'OK', {
              duration: 3000
            });
          }
        },
        error: (loginErr) => {
          console.error('Auto-login failed after registration:', loginErr);
          this.snackBar.open('Registration successful. Please log in manually to view movies.', 'OK', {
            duration: 4000
          });
        }
      });
    }, (result) => {
      console.error('Registration failed:', result);
      let errorMessage = 'Registration failed';
      
      if (result.status === 500) {
        errorMessage = 'Server error: The backend is experiencing issues. This may be due to database problems or server configuration. Please try again later or contact support.';
        console.error('🔥 Backend server error - this requires backend/database investigation');
      } else if (result.status === 422) {
        errorMessage = 'Invalid user data. Please check your input and try again.';
      } else if (result.status === 409) {
        errorMessage = 'Username or email already exists. Please choose different credentials.';
      } else if (result.message && typeof result.message === 'string') {
        errorMessage = result.message;
      } else if (result.error && result.error.error) {
        errorMessage = result.error.error;
      } else if (result.error && typeof result.error === 'string') {
        errorMessage = result.error;
      }
      
      this.snackBar.open(errorMessage, 'OK', {
        duration: 6000 // Longer duration for server errors
      });
    });
  }
}