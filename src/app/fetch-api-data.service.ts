import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/** Base API URL for the myFlix backend service */
const baseApiUrl = 'https://movie-flix-fb6c35ebba0a.herokuapp.com/';
/** CORS proxy URL for GitHub Pages deployment */
const corsProxy = 'https://corsproxy.io/?';

/**
 * Service for handling all API calls to the myFlix backend
 * Provides methods for user authentication, movie data retrieval, and user profile management
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  
  /**
   * Constructor - Injects HttpClient for making HTTP requests
   * @param http - Angular HttpClient for API communication
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Helper method to construct proper URL for both local and GitHub Pages environments
   * Automatically adds CORS proxy when running on GitHub Pages
   * 
   * @private
   * @param endpoint - The API endpoint to append to the base URL
   * @returns The complete URL for the API call
   */
  private constructUrl(endpoint: string): string {
    const isGitHubPages = window.location.hostname.includes('github.io');
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    const finalUrl = isGitHubPages 
      ? corsProxy + baseApiUrl + endpoint
      : baseApiUrl + endpoint;
    
    console.log('Constructing URL:', {
      hostname: window.location.hostname,
      isGitHubPages,
      isLocalhost,
      endpoint,
      baseApiUrl,
      finalUrl
    });
    
    return finalUrl;
  }

  /**
   * Registers a new user with the myFlix API
   * 
   * @param userDetails - Object containing user registration data (Username, Password, Email, Birthday)
   * @returns Observable containing the registration response
   * @throws Error when required fields are missing
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log('User registration called with:', userDetails);
    
    // Validate required fields
    if (!userDetails.Username || !userDetails.Password || !userDetails.Email) {
      throw new Error('Missing required fields: Username, Password, and Email are required');
    }
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    const url = this.constructUrl('users');
    console.log('Making registration request to:', url);
    
    return this.http.post(url, userDetails, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Authenticates a user with the myFlix API
   * 
   * @param userDetails - Object containing login credentials (Username, Password)
   * @returns Observable containing the login response with user data and JWT token
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.constructUrl('login'), userDetails, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves all movies from the myFlix API
   * Requires user authentication via JWT token stored in localStorage
   * 
   * @returns Observable containing an array of all movie objects
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.constructUrl('movies'), {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves detailed information about a specific movie
   * 
   * @param title - The title of the movie to retrieve
   * @returns Observable containing the movie object with detailed information
   */
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.constructUrl('movies/' + title), {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the get one director endpoint
  public getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.constructUrl('movies/director/' + directorName), {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the get one genre endpoint
  public getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.constructUrl('movies/genre/' + genreName), {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the get one user endpoint
  public getOneUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.get(this.constructUrl('users/' + user.Username), {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the get favourite movies for a user endpoint
  public getFavouriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.get(this.constructUrl('users/' + user.Username), {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  // Making the api call for the add a movie to favourite Movies endpoint
  public addFavouriteMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.post(this.constructUrl('users/' + user.Username + '/movies/' + movieId), {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the edit user endpoint
  public editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.put(this.constructUrl('users/' + user.Username), updatedUser, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the delete user endpoint
  public deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(this.constructUrl('users/' + user.Username), {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the delete a movie from the favourite movies endpoint
  public deleteFavouriteMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(this.constructUrl('users/' + user.Username + '/movies/' + movieId), {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is:`, error.error);
      console.log('Full error object:', error);
      console.log('Error status text:', error.statusText);
      console.log('Error message:', error.message);
    }
    
    // Return the actual error object so we can access the details
    return throwError(error);
  }
}
