import { Component, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  standalone: false,
  templateUrl: './user-login-form.html',
  styleUrls: ['./user-login-form.scss']
})
export class UserLoginForm {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginForm>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result: any) => {
      // Logic for a successful user login goes here! (To be implemented)
      console.log(result); // Add console.log as per tutor instructions
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('User login successful', 'OK', {
        duration: 2000
      });
      // Navigate to movies page after successful login
      this.router.navigate(['movies']);
    }, (result: any) => {
      console.log(result); // Add console.log for error response
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
