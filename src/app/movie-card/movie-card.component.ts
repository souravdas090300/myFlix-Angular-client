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
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) { }

ngOnInit(): void {
  console.log('MovieCardComponent initialized');
  console.log('Checking localStorage token:', localStorage.getItem('token'));
  console.log('Checking localStorage user:', localStorage.getItem('user'));
  this.getMovies();
}

getMovies(): void {
  console.log('Calling getAllMovies...');
  console.log('Current token:', localStorage.getItem('token'));
  console.log('Current user:', localStorage.getItem('user'));
  
  this.fetchApiData.getAllMovies().subscribe({
    next: (resp: any) => {
      // Use ChangeDetectorRef to properly handle change detection
      this.movies = resp;
      this.cdr.detectChanges();
      console.log('Movies received:', this.movies);
      console.log('Number of movies:', this.movies.length);
      
      // Log the structure of the first movie to help debug
      if (this.movies.length > 0) {
        console.log('First movie structure:', this.movies[0]);
        console.log('First movie Director:', this.movies[0].Director);
        console.log('First movie Genre:', this.movies[0].Genre);
      }
    },
    error: (error) => {
      console.error('Failed to load movies:', error);
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
    // Check if we have valid genre data
    if (!name) {
      console.warn('Genre name is missing');
      return;
    }
    
    this.dialog.open(GenreDialogComponent, {
      data: {
        Name: name || 'Unknown Genre',
        Description: description || 'No description available.'
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
    // Check if we have valid director data
    if (!name) {
      console.warn('Director name is missing');
      return;
    }
    
    this.dialog.open(DirectorDialogComponent, {
      data: {
        Name: name || 'Unknown Director',
        Bio: bio || 'No biography available.',
        Birth: birth || 'Unknown',
        Death: death || 'N/A'
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
