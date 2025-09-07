import { Component } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Welcome page component that serves as the landing page for the myFlix application
 * Provides options for user registration and login through modal dialogs
 */
@Component({
  selector: 'app-welcome-page',
  standalone: false,
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  /**
   * Constructor for WelcomePageComponent
   * @param dialog - Angular Material dialog service for opening modal dialogs
   */
  constructor(public dialog: MatDialog) { }
  
  /**
   * Opens the user registration dialog modal
   * Sets dialog width to 280px for optimal mobile display
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog modal  
   * Sets dialog width to 280px for optimal mobile display
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
