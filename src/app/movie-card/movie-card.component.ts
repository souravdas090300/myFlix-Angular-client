// src/app/movie-card/movie-card.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    public router: Router
  ) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  // Check if user has a token (is logged in)
  const token = localStorage.getItem('token');
  if (!token) {
    this.isLoading = false;
    setTimeout(() => {
      this.snackBar.open('Please log in to view movies', 'OK', {
        duration: 3000
      });
      this.cdr.detectChanges();
    }, 0);
    return;
  }

  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.isLoading = false;
      console.log('Movies loaded from Heroku:', this.movies);
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 0);
    }, (error) => {
      console.error('Error fetching movies from Heroku:', error);
      this.isLoading = false;
      setTimeout(() => {
        this.snackBar.open('Failed to load movies from Heroku server. Please check your connection.', 'OK', {
          duration: 4000
        });
        this.cdr.detectChanges();
      }, 0);
    });
  }

  // Navigation method for logout only (other navigation uses routerLink)
  logout(): void {
    console.log('🚪 Logging out...');
    localStorage.clear(); // Clear all localStorage data
    this.snackBar.open('Logged out successfully', 'OK', {
      duration: 2000
    });
    this.router.navigate(['/welcome']);
  }
}
