import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})
export class UserProfile implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  user: any = {};
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getFavorites();
  }

  getUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchApiData.getUser(user.Username).subscribe((resp: any) => {
      this.user = resp;
      this.userData = {
        Username: this.user.Username,
        Password: '',
        Email: this.user.Email,
        Birthday: this.user.Birthday
      };
    }, (result: any) => {
      console.log(result); // Add console.log as per tutor instructions
    });
  }

  getFavorites(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchApiData.getFavoriteMovies(user.Username).subscribe((resp: any) => {
      this.favorites = resp;
    }, (result: any) => {
      console.log(result); // Add console.log as per tutor instructions
    });
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.user.Username, this.userData).subscribe(() => {
      this.snackBar.open('Profile updated successfully!', 'OK', {
        duration: 2000
      });
      // Update localStorage with new user data
      localStorage.setItem('user', JSON.stringify(this.userData));
    }, (result: any) => {
      console.log(result); // Add console.log as per tutor instructions
      this.snackBar.open('Failed to update profile', 'OK', {
        duration: 2000
      });
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUser(this.user.Username).subscribe(() => {
        this.snackBar.open('Account deleted successfully', 'OK', {
          duration: 2000
        });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['welcome']);
      }, (result: any) => {
        console.log(result); // Add console.log as per tutor instructions
        this.snackBar.open('Failed to delete account', 'OK', {
          duration: 2000
        });
      });
    }
  }

  removeFromFavorites(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(this.user.Username, movieId).subscribe(() => {
      this.snackBar.open('Movie removed from favorites!', 'OK', {
        duration: 2000
      });
      this.getFavorites();
    }, (result: any) => {
      console.log(result); // Add console.log as per tutor instructions
    });
  }

  backToMovies(): void {
    this.router.navigate(['movies']);
  }
}
