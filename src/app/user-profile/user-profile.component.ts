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
  originalUser: any = {}; // Store original user data for cancel functionality
  favoriteMovies: any[] = [];
  editMode = false; // Toggle between view and edit mode
  isLoading = true; // Add loading state

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    console.log('UserProfileComponent initialized');
    this.getUser();
    this.getFavoriteMovies();
  }

  /**
   * Get user information from localStorage
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log('User from localStorage:', user);
    console.log('Token from localStorage:', token);
    
    if (user && token) {
      try {
        this.user = JSON.parse(user);
        this.originalUser = { ...this.user }; // Store original data
        console.log('Parsed user data:', this.user);
        this.isLoading = false;
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/welcome']);
      }
    } else {
      console.log('No user data or token found, redirecting to welcome');
      // If no user data, redirect to welcome page
      this.snackBar.open('Please log in to view your profile', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/welcome']);
    }
  }

  /**
   * Get user's favorite movies with full movie details
   */
  getFavoriteMovies(): void {
    if (this.user.FavoriteMovies && this.user.FavoriteMovies.length > 0) {
      this.fetchApiData.getAllMovies().subscribe((allMovies: any) => {
        this.favoriteMovies = allMovies.filter((movie: any) => 
          this.user.FavoriteMovies.includes(movie._id)
        );
        console.log('Favorite movies:', this.favoriteMovies);
      }, (error: any) => {
        console.log('Error fetching movies:', error);
      });
    } else {
      this.favoriteMovies = [];
    }
  }

  /**
   * Update user profile
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.user).subscribe((result) => {
      console.log('User update result:', result);
      localStorage.setItem('user', JSON.stringify(result));
      this.user = result; // Update local user data
      this.editMode = false; // Exit edit mode
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
      this.fetchApiData.deleteUser().subscribe((result) => {
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
    console.log('🚪 Logging out from profile...');
    localStorage.clear(); // Clear all localStorage data
    this.snackBar.open('Logged out successfully', 'OK', {
      duration: 2000
    });
    this.router.navigate(['/welcome']);
  }

  /**
   * Navigate back to movies page
   */
  backToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Toggle edit mode
   */
  toggleEditMode(): void {
    this.editMode = true;
    this.originalUser = { ...this.user }; // Store original data for cancel
  }

  /**
   * Cancel edit mode and restore original data
   */
  cancelEdit(): void {
    this.editMode = false;
    this.user = { ...this.originalUser }; // Restore original data
  }

  /**
   * Format birthday date for display
   */
  formatBirthday(birthday: string): string {
    if (!birthday) return 'Not provided';
    
    try {
      const date = new Date(birthday);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  }

  /**
   * Remove movie from favorites
   */
  removeFromFavorites(movieId: string): void {
    this.fetchApiData.deleteFavouriteMovie(movieId).subscribe((result: any) => {
      console.log('Movie removed from favorites:', result);
      // Update local user data
      if (this.user.FavoriteMovies) {
        this.user.FavoriteMovies = this.user.FavoriteMovies.filter((id: string) => id !== movieId);
        localStorage.setItem('user', JSON.stringify(this.user));
      }
      // Refresh favorite movies list
      this.getFavoriteMovies();
      this.snackBar.open('Movie removed from favorites!', 'OK', {
        duration: 2000
      });
    }, (error: any) => {
      console.log('Error removing from favorites:', error);
      this.snackBar.open('Failed to remove movie from favorites', 'OK', {
        duration: 2000
      });
    });
  }
}
