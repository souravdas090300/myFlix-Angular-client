import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationForm } from '../user-registration-form/user-registration-form';
import { UserLoginForm } from '../user-login-form/user-login-form';

@Component({
  selector: 'app-welcome-page',
  standalone: false,
  templateUrl: './welcome-page.html',
  styleUrls: ['./welcome-page.scss']
})
export class WelcomePage {
  constructor(public dialog: MatDialog) { }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationForm, {
      width: '280px'
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginForm, {
      width: '280px'
    });
  }
}
