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
  originalUser: any = {};
  editedUser: any = {}; // Separate object for editing
  favoriteMovies: any[] = [];
  editMode = false;
  isLoading = true;

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (user && token) {
      try {
        this.user = JSON.parse(user);
        this.originalUser = { ...this.user };
        // Initialize edit user without password
        this.editedUser = { 
          Username: this.user.Username,
          Email: this.user.Email,
          Birthday: this.user.Birthday,
          Password: '' // Always start with empty password
        };
        this.getFavoriteMovies();
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/welcome']);
      }
    } else {
      this.snackBar.open('Please log in to view your profile', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/welcome']);
    }
  }

  getFavoriteMovies(): void {
    if (this.user.FavoriteMovies && this.user.FavoriteMovies.length > 0) {
      this.fetchApiData.getAllMovies().subscribe(
        (allMovies: any) => {
          this.favoriteMovies = allMovies.filter((movie: any) => 
            this.user.FavoriteMovies.includes(movie._id)
          );
          this.isLoading = false;
        }, 
        (error: any) => {
          console.error('Error fetching movies:', error);
          this.isLoading = false;
          this.snackBar.open('Error loading favorite movies', 'OK', {
            duration: 3000
          });
        }
      );
    } else {
      this.favoriteMovies = [];
      this.isLoading = false;
    }
  }

  updateUser(): void {
    if (!this.editedUser.Username || !this.editedUser.Email) {
      this.snackBar.open('Username and Email are required', 'OK', {
        duration: 3000
      });
      return;
    }

    // Create update payload, only include password if it's not empty
    const updatePayload: any = {
      Username: this.editedUser.Username,
      Email: this.editedUser.Email,
      Birthday: this.editedUser.Birthday
    };

    // Only include password if user entered a new one
    if (this.editedUser.Password && this.editedUser.Password.trim() !== '') {
      updatePayload.Password = this.editedUser.Password;
    }

    this.fetchApiData.editUser(updatePayload).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.user = result;
        this.originalUser = { ...result };
        // Reset edited user with empty password
        this.editedUser = { 
          Username: result.Username,
          Email: result.Email,
          Birthday: result.Birthday,
          Password: ''
        };
        this.editMode = false;
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000
        });
      }, 
      (error) => {
        console.error('Error updating user:', error);
        const errorMessage = error.error?.message || 'Failed to update profile';
        this.snackBar.open(errorMessage, 'OK', {
          duration: 3000
        });
      }
    );
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUser().subscribe(
        () => {
          localStorage.clear();
          this.snackBar.open('Account deleted successfully', 'OK', {
            duration: 3000
          });
          this.router.navigate(['/welcome']);
        }, 
        (error) => {
          console.error('Error deleting user:', error);
          const errorMessage = error.error?.message || 'Failed to delete account';
          this.snackBar.open(errorMessage, 'OK', {
            duration: 3000
          });
        }
      );
    }
  }

  logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.clear();
      this.snackBar.open('Logged out successfully', 'OK', {
        duration: 2000
      });
      this.router.navigate(['/welcome'], { replaceUrl: true });
    }
  }

  toggleEditMode(): void {
    this.editMode = true;
    // Reset editedUser with current user data but empty password
    this.editedUser = { 
      Username: this.user.Username,
      Email: this.user.Email,
      Birthday: this.user.Birthday,
      Password: '' // Always start with empty password
    };
    this.originalUser = { ...this.user };
  }

  cancelEdit(): void {
    this.editMode = false;
    // Reset editedUser
    this.editedUser = { 
      Username: this.user.Username,
      Email: this.user.Email,
      Birthday: this.user.Birthday,
      Password: ''
    };
  }

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

  removeFromFavorites(movieId: string): void {
    if (confirm('Are you sure you want to remove this movie from your favorites?')) {
      this.fetchApiData.deleteFavouriteMovie(movieId).subscribe(
        () => {
          if (this.user.FavoriteMovies) {
            this.user.FavoriteMovies = this.user.FavoriteMovies.filter((id: string) => id !== movieId);
            localStorage.setItem('user', JSON.stringify(this.user));
          }
          this.getFavoriteMovies();
          this.snackBar.open('Movie removed from favorites!', 'OK', {
            duration: 2000
          });
        }, 
        (error: any) => {
          console.error('Error removing from favorites:', error);
          const errorMessage = error.error?.message || 'Failed to remove movie from favorites';
          this.snackBar.open(errorMessage, 'OK', {
            duration: 3000
          });
        }
      );
    }
  }
}