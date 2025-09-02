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
  templateUrl: './user-registration-form.html',
  styleUrls: ['./user-registration-form.scss']
})
export class UserRegistrationForm {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationForm>,
    public snackBar: MatSnackBar) { }

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      console.log(result); // Add console.log as per tutor instructions
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result); // Add console.log for error response
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
