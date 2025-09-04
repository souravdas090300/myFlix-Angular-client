// src/app/movie-card/movie-card.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  isLoading = true;
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) { 
    // Force reload when component is created
    console.log('MovieCardComponent constructor called');
  }

  ngOnInit(): void {
    console.log('=== MovieCard ngOnInit called ===');
    console.log('Current URL:', window.location.href);
    
    // Force reload movies every time component initializes
    this.forceReloadMovies();
    
    // Add window focus listener to reload when returning to page
    window.addEventListener('focus', () => {
      console.log('Window focused - checking if movies need reload');
      if (this.movies.length === 0 || !this.movies) {
        console.log('Movies array empty, forcing reload');
        this.forceReloadMovies();
      }
    });
    
    // Also add visibility change listener
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        console.log('Page became visible - checking movies');
        if (this.movies.length === 0 || !this.movies) {
          console.log('Movies array empty, forcing reload');
          this.forceReloadMovies();
        }
      }
    });
  }

  forceReloadMovies(): void {
    console.log('Force reloading movies...');
    
    // Reset state
    this.movies = [];
    this.isLoading = true;
    
    // Check authentication
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    console.log('Token exists:', !!token);
    console.log('User exists:', !!user);
    
    if (!token || !user) {
      console.log('No authentication found, redirecting to welcome');
      this.router.navigate(['welcome']);
      return;
    }
    
    // Force a small delay then get movies
    setTimeout(() => {
      this.getMovies();
    }, 100);
  }

  getMovies(): void {
    console.log('Getting movies...');
    console.log('Token:', localStorage.getItem('token'));
    console.log('User:', localStorage.getItem('user'));
    
    this.isLoading = true;
    
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp: any) => {
        console.log('Movies response:', resp);
        // Use setTimeout to defer the update to the next tick
        setTimeout(() => {
          this.movies = resp;
          this.isLoading = false;
          console.log('Movies set:', this.movies);
          this.cdr.detectChanges(); // Manually trigger change detection
        }, 0);
      },
      error: (error) => {
        console.error('Error getting movies:', error);
        this.isLoading = false;
        this.snackBar.open('Failed to load movies. Please try logging in again.', 'OK', {
          duration: 4000
        });
        // If we get a 401 (unauthorized), redirect to welcome page
        if (error.status === 401) {
          console.log('Unauthorized - redirecting to welcome page');
          localStorage.clear();
          this.router.navigate(['welcome']);
        }
      }
    });
  }

  /**
   * Opens a dialog to display genre details
   * @param name - genre name
   * @param description - genre description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '400px'
    });
  }

  /**
   * Opens a dialog to display director details
   * @param name - director name
   * @param bio - director biography
   * @param birth - director birth date
   * @param death - director death date
   */
  openDirectorDialog(name: string, bio: string, birth?: string, death?: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      width: '500px'
    });
  }

  /**
   * Opens a dialog to display movie details
   * @param movie - movie object
   */
  openMovieDetailsDialog(movie: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: movie,
      width: '600px'
    });
  }

  /**
   * Add movie to favorites
   * @param movieId - movie ID
   */
  addToFavorites(movieId: string): void {
    this.fetchApiData.addFavouriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Movie added to favorites!', 'OK', {
        duration: 2000
      });
    });
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
