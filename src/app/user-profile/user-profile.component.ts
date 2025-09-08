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
  
  // Validation flags
  validationErrors: any = {
    username: '',
    email: '',
    password: ''
  };

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
        // Initialize edit user with proper default values
        this.editedUser = { 
          Username: this.user.Username,
          Email: this.user.Email,
          Birthday: this.formatDateForInput(this.user.Birthday), // Format birthday for input
          Password: '' // Always start with empty password - user must enter old password or new password
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
    // Clear previous validation errors
    this.validationErrors = {
      username: '',
      email: '',
      password: ''
    };

    let hasErrors = false;

    // Validate Username
    if (!this.editedUser.Username || this.editedUser.Username.trim() === '') {
      this.validationErrors.username = 'Username is required';
      hasErrors = true;
    }

    // Validate Email
    if (!this.editedUser.Email || this.editedUser.Email.trim() === '') {
      this.validationErrors.email = 'Email is required';
      hasErrors = true;
    } else if (!this.isValidEmail(this.editedUser.Email)) {
      this.validationErrors.email = 'Email must be a valid email address';
      hasErrors = true;
    }

    // Validate Password - REQUIRED (user must enter old password or new password)
    if (!this.editedUser.Password || this.editedUser.Password.trim() === '') {
      this.validationErrors.password = 'Password field cannot be empty. Enter your current password or a new password.';
      hasErrors = true;
    }

    // If validation errors exist, show them and return
    if (hasErrors) {
      let errorMessage = 'Please fix the following errors:\n';
      if (this.validationErrors.username) errorMessage += `• ${this.validationErrors.username}\n`;
      if (this.validationErrors.email) errorMessage += `• ${this.validationErrors.email}\n`;
      if (this.validationErrors.password) errorMessage += `• ${this.validationErrors.password}`;
      
      this.snackBar.open(errorMessage, 'OK', {
        duration: 5000
      });
      return;
    }

    // Create update payload
    const updatePayload: any = {
      Username: this.editedUser.Username.trim(),
      Email: this.editedUser.Email.trim(),
      Birthday: this.editedUser.Birthday,
      Password: this.editedUser.Password // Always include password as it's required
    };

    this.fetchApiData.editUser(updatePayload).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.user = result;
        this.originalUser = { ...result };
        // Reset edited user with empty password and formatted birthday
        this.editedUser = { 
          Username: result.Username,
          Email: result.Email,
          Birthday: this.formatDateForInput(result.Birthday),
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
    // Reset validation errors when entering edit mode
    this.validationErrors = {
      username: '',
      email: '',
      password: ''
    };
    // Reset editedUser with current user data but empty password and formatted birthday
    this.editedUser = { 
      Username: this.user.Username,
      Email: this.user.Email,
      Birthday: this.formatDateForInput(this.user.Birthday),
      Password: '' // Always start with empty password - user must enter current or new password
    };
    this.originalUser = { ...this.user };
  }

  cancelEdit(): void {
    this.editMode = false;
    // Clear validation errors
    this.validationErrors = {
      username: '',
      email: '',
      password: ''
    };
    // Reset editedUser
    this.editedUser = { 
      Username: this.user.Username,
      Email: this.user.Email,
      Birthday: this.formatDateForInput(this.user.Birthday),
      Password: ''
    };
  }

  // Helper method to validate email format
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Helper method to format date for HTML date input
  formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    } catch {
      return '';
    }
  }

  // Helper method to format birthday for display
  formatBirthday(dateString: string): string {
    if (!dateString) return 'Not specified';
    try {
      const date = new Date(dateString);
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