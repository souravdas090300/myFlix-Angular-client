import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * User Profile Component for the myFlix Angular application
 * 
 * This component handles user profile management including:
 * - Displaying user information and favorite movies
 * - Editing user profile details with validation
 * - Managing favorite movies (viewing and removing)
 * - User account deletion and logout functionality
 * 
 * The component features inline editing, comprehensive form validation,
 * and proper error handling for all user operations.
 * 
 * @example
 * ```html
 * <app-user-profile></app-user-profile>
 * ```
 */
@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /** Current user data loaded from localStorage */
  user: any = {};
  
  /** Backup of original user data for canceling edits */
  originalUser: any = {};
  
  /** Separate object for handling edit operations */
  editedUser: any = {};
  
  /** Array of user's favorite movies with full movie details */
  favoriteMovies: any[] = [];
  
  /** Boolean flag indicating if the component is in edit mode */
  editMode = false;
  
  /** Loading state indicator for async operations */
  isLoading = true;
  
  /** Object containing validation error messages for form fields */
  validationErrors: any = {
    username: '',
    email: '',
    password: ''
  };

  /**
   * Constructor - Injects required services for user profile functionality
   * 
   * @param fetchApiData - Service for API communication with myFlix backend
   * @param snackBar - Material Design snackbar for user notifications
   * @param router - Angular router for navigation between components
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  /**
   * Angular lifecycle hook - initializes the component
   * 
   * Automatically called after component initialization to load user data
   * and set up the component state.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Retrieves and loads user data from localStorage
   * 
   * Validates stored user data, initializes component state, and redirects
   * to welcome page if authentication is invalid. Also loads user's favorite movies.
   * 
   * @throws Redirects to welcome page if user data is invalid or missing
   */
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

  /**
   * Fetches and loads user's favorite movies with complete movie details
   * 
   * Retrieves all movies from the API and filters them based on the user's
   * favorite movie IDs. Updates the component's loading state and handles errors.
   * 
   * @private
   */
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

  /**
   * Updates user profile information with validation
   * 
   * Performs comprehensive validation on all form fields including:
   * - Required field validation for username, email, and password
   * - Email format validation
   * - Password requirement (must enter current or new password)
   * 
   * Updates localStorage and component state on successful update.
   * Displays appropriate success or error messages to the user.
   * 
   * @throws Displays validation errors if any required fields are invalid
   */
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

    // Password REQUIRED: user must enter current or new password (API requires password)
    if (!this.editedUser.Password || this.editedUser.Password.trim() === '') {
      this.validationErrors.password = 'Password is required. Enter your current password or a new password.';
      hasErrors = true;
    } else if (this.editedUser.Password.trim().length < 4) {
      this.validationErrors.password = 'Password must be at least 4 characters.';
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
      Password: this.editedUser.Password.trim()
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

  /**
   * Permanently deletes the user account from the system
   * 
   * Prompts user for confirmation before proceeding with account deletion.
   * Clears all localStorage data and redirects to welcome page on success.
   * 
   * @throws Displays error message if deletion fails
   */
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

  /**
   * Logs out the current user and clears session data
   * 
   * Prompts user for confirmation, clears all localStorage data,
   * and navigates to the welcome page with URL replacement to prevent
   * back navigation to protected routes.
   */
  logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.clear();
      this.snackBar.open('Logged out successfully', 'OK', {
        duration: 2000
      });
      this.router.navigate(['/welcome'], { replaceUrl: true });
    }
  }

  /**
   * Enables edit mode for user profile modification
   * 
   * Initializes the edit form with current user data, clears any existing
   * validation errors, and sets up the component for editing operations.
   * Password field is intentionally left empty for security.
   */
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

  /**
   * Cancels edit mode and resets form to original state
   * 
   * Disables edit mode, clears all validation errors, and restores
   * the edit form to the original user data without saving changes.
   */
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

  /**
   * Validates email format using regular expression
   * 
   * @param email - The email string to validate
   * @returns True if email format is valid, false otherwise
   * 
   * @example
   * ```typescript
   * const isValid = this.isValidEmail('user@example.com'); // returns true
   * const isInvalid = this.isValidEmail('invalid-email'); // returns false
   * ```
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Formats date string for HTML date input field
   * 
   * Converts various date formats to YYYY-MM-DD format required by HTML date inputs.
   * 
   * @param dateString - The date string to format
   * @returns Formatted date string in YYYY-MM-DD format, or empty string if invalid
   * 
   * @example
   * ```typescript
   * const formatted = this.formatDateForInput('2023-12-25T00:00:00.000Z');
   * // returns '2023-12-25'
   * ```
   */
  formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    } catch {
      return '';
    }
  }

  /**
   * Formats birthday date for user-friendly display
   * 
   * Converts date string to localized format for better readability in the UI.
   * 
   * @param dateString - The date string to format for display
   * @returns Human-readable date string or appropriate fallback message
   * 
   * @example
   * ```typescript
   * const display = this.formatBirthday('1990-05-15');
   * // returns 'May 15, 1990'
   * ```
   */
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

  /**
   * Removes a movie from the user's favorites list
   * 
   * Prompts user for confirmation before removing the movie from favorites.
   * Updates both the backend data and local storage, then refreshes the
   * favorite movies display.
   * 
   * @param movieId - The unique identifier of the movie to remove from favorites
   * 
   * @example
   * ```typescript
   * this.removeFromFavorites('507f1f77bcf86cd799439011');
   * ```
   */
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