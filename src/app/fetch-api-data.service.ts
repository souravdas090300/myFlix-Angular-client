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

  /**
   * Retrieves detailed information about a specific movie director
   * 
   * @param directorName - The name of the director to retrieve information for
   * @returns Observable containing director information including biography and birth/death dates
   */
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

  /**
   * Retrieves detailed information about a specific movie genre
   * 
   * @param genreName - The name of the genre to retrieve information for
   * @returns Observable containing genre information and description
   */
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

  /**
   * Retrieves detailed information about the currently authenticated user
   * 
   * Uses the username from localStorage to fetch current user data from the API.
   * Requires valid JWT token for authentication.
   * 
   * @returns Observable containing complete user profile information
   * @throws Error if no user is found in localStorage or authentication fails
   */
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

  /**
   * Retrieves the list of favorite movie IDs for the current user
   * 
   * Fetches user data and extracts only the FavoriteMovies array.
   * Used to check which movies are favorited by the user.
   * 
   * @returns Observable containing array of favorite movie IDs
   */
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

  /**
   * Adds a movie to the user's favorites list
   * 
   * @param movieId - The unique identifier of the movie to add to favorites
   * @returns Observable containing updated user data with the new favorite movie
   * 
   * @example
   * ```typescript
   * this.fetchApiData.addFavouriteMovie('507f1f77bcf86cd799439011').subscribe(result => {
   *   console.log('Movie added to favorites:', result);
   * });
   * ```
   */
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

  /**
   * Updates user profile information
   * 
   * @param updatedUser - Object containing updated user data (Username, Email, Birthday, Password)
   * @returns Observable containing the updated user profile information
   * 
   * @example
   * ```typescript
   * const userUpdates = {
   *   Username: 'newusername',
   *   Email: 'newemail@example.com',
   *   Birthday: '1990-01-01',
   *   Password: 'newpassword123'
   * };
   * this.fetchApiData.editUser(userUpdates).subscribe(result => {
   *   console.log('User updated:', result);
   * });
   * ```
   */
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

  /**
   * Permanently deletes the current user's account
   * 
   * Removes the user account and all associated data from the system.
   * This action cannot be undone.
   * 
   * @returns Observable that completes when the user is successfully deleted
   * @throws Error if user deletion fails or user is not authenticated
   */
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

  /**
   * Removes a movie from the user's favorites list
   * 
   * @param movieId - The unique identifier of the movie to remove from favorites
   * @returns Observable containing updated user data without the removed favorite movie
   * 
   * @example
   * ```typescript
   * this.fetchApiData.deleteFavouriteMovie('507f1f77bcf86cd799439011').subscribe(result => {
   *   console.log('Movie removed from favorites:', result);
   * });
   * ```
   */
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

  /**
   * Extracts response data from HTTP responses
   * 
   * @private
   * @param res - The HTTP response object
   * @returns The response body or empty object if no body exists
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  /**
   * Global error handler for HTTP requests
   * 
   * Logs detailed error information to the console and returns an error observable
   * that components can subscribe to for error handling.
   * 
   * @private
   * @param error - The HTTP error response
   * @returns Error observable with the original error for component handling
   */
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
