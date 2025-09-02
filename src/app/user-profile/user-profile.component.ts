import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Get user information from localStorage
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      console.log('User data:', this.user);
    } else {
      // If no user data, redirect to welcome page
      this.router.navigate(['welcome']);
    }
  }

  /**
   * Update user profile
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.user.Username, this.user).subscribe((result) => {
      console.log('User update result:', result);
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('Profile updated successfully!', 'OK', {
        duration: 2000
      });
    }, (error) => {
      console.log('Error updating user:', error);
      this.snackBar.open('Failed to update profile', 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Delete user account
   */
  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      this.fetchApiData.deleteUser(this.user.Username).subscribe((result) => {
        console.log('User deleted:', result);
        localStorage.clear();
        this.snackBar.open('Account deleted successfully', 'OK', {
          duration: 2000
        });
        this.router.navigate(['welcome']);
      }, (error) => {
        console.log('Error deleting user:', error);
        this.snackBar.open('Failed to delete account', 'OK', {
          duration: 2000
        });
      });
    }
  }

  /**
   * Logout user
   */
  logOut(): void {
    localStorage.clear();
    this.snackBar.open('Logged out successfully', 'OK', {
      duration: 2000
    });
    this.router.navigate(['welcome']);
  }
}
