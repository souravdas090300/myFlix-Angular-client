import { Component } from '@angular/core';
import { UserRegistrationForm } from './user-registration-form/user-registration-form';
import { UserLoginForm } from './user-login-form/user-login-form';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }

  // This is the function that will open the dialog when the signup button is clicked  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationForm, {
      // Assigning the dialog a width
      width: '280px'
    });
  }

  // This is the function that will open the dialog when the login button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginForm, {
      // Assigning the dialog a width
      width: '280px'
    });
  }
}
