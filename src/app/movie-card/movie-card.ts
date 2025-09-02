import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsDialog } from '../movie-details-dialog/movie-details-dialog';
import { GenreDialog } from '../genre-dialog/genre-dialog';
import { DirectorDialog } from '../director-dialog/director-dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss']
})
export class MovieCard implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavorites(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchApiData.getFavoriteMovies(user.Username).subscribe((resp: any) => {
      this.favorites = resp;
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favorites.some(movie => movie._id === movieId);
  }

  openMovieDialog(movie: any): void {
    this.dialog.open(MovieDetailsDialog, {
      data: { movie },
      width: '500px'
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialog, {
      data: { genre },
      width: '400px'
    });
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialog, {
      data: { director },
      width: '400px'
    });
  }

  addToFavorites(movieId: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchApiData.addFavoriteMovie(user.Username, movieId).subscribe(() => {
      this.snackBar.open('Movie added to favorites!', 'OK', {
        duration: 2000
      });
      this.getFavorites();
    });
  }

  removeFromFavorites(movieId: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchApiData.deleteFavoriteMovie(user.Username, movieId).subscribe(() => {
      this.snackBar.open('Movie removed from favorites!', 'OK', {
        duration: 2000
      });
      this.getFavorites();
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

  openProfile(): void {
    this.router.navigate(['profile']);
  }
}
