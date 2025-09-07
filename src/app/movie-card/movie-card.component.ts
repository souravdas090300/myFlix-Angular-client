import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
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
    public snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.isLoading = false;
      this.snackBar.open('Please log in to view movies', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/welcome']);
      return;
    }

    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
        this.isLoading = false;
        this.cdr.detectChanges();
      }, 
      (error) => {
        console.error('Error fetching movies:', error);
        this.isLoading = false;
        this.snackBar.open('Failed to load movies. Please check your connection.', 'OK', {
          duration: 4000
        });
        this.cdr.detectChanges();
      }
    );
  }

  openGenreDialog(genre: any): void {
    if (!genre || !genre.Name) {
      this.snackBar.open('Genre information not available', 'OK', { 
        duration: 2000 
      });
      return;
    }
    this.dialog.open(GenreDialogComponent, {
      data: genre,
      width: '400px'
    });
  }

  openDirectorDialog(director: any): void {
    if (!director || !director.Name) {
      this.snackBar.open('Director information not available', 'OK', { 
        duration: 2000 
      });
      return;
    }
    this.dialog.open(DirectorDialogComponent, {
      data: director,
      width: '500px'
    });
  }

  openSynopsisDialog(movie: any): void {
    if (!movie) {
      this.snackBar.open('Movie details not available', 'OK', { 
        duration: 2000 
      });
      return;
    }
    this.dialog.open(MovieDetailsDialogComponent, {
      data: movie,
      width: '600px'
    });
  }

  toggleFavorite(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isFavorite = user.FavoriteMovies?.includes(movie._id);
    
    if (isFavorite) {
      this.fetchApiData.deleteFavouriteMovie(movie._id).subscribe(
        () => {
          this.snackBar.open('Removed from favorites', 'OK', { duration: 2000 });
          user.FavoriteMovies = user.FavoriteMovies.filter((id: string) => id !== movie._id);
          localStorage.setItem('user', JSON.stringify(user));
          this.cdr.detectChanges();
        }, 
        (error: any) => {
          console.error('Error removing favorite:', error);
          this.snackBar.open('Failed to remove from favorites', 'OK', { duration: 2000 });
        }
      );
    } else {
      this.fetchApiData.addFavouriteMovie(movie._id).subscribe(
        () => {
          this.snackBar.open('Added to favorites', 'OK', { duration: 2000 });
          if (!user.FavoriteMovies) user.FavoriteMovies = [];
          user.FavoriteMovies.push(movie._id);
          localStorage.setItem('user', JSON.stringify(user));
          this.cdr.detectChanges();
        }, 
        (error: any) => {
          console.error('Error adding favorite:', error);
          this.snackBar.open('Failed to add to favorites', 'OK', { duration: 2000 });
        }
      );
    }
  }

  isFavorite(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies?.includes(movieId) || false;
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
}