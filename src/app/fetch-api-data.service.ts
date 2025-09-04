import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

// Use environment-based API URL configuration
// Development: uses proxy (/api/) to avoid CORS issues
// Production: uses deployed Heroku API directly
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Get HTTP options with proper headers
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log('=== REGISTRATION DEBUG ===');
    console.log('Original data:', userDetails);
    console.log('API URL:', apiUrl + 'users');
    
    // Ensure data is properly formatted and validate required fields
    if (!userDetails.Username || !userDetails.Password || !userDetails.Email) {
      console.error('Missing required fields:', userDetails);
      return throwError(() => new Error('Username, Password, and Email are required'));
    }
    
    // Create test data with known working format
    const registrationData = {
      Username: String(userDetails.Username).trim(),
      Password: String(userDetails.Password),
      Email: String(userDetails.Email).trim().toLowerCase(),
      Birthday: userDetails.Birthday || '1990-01-01'
    };
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registrationData.Email)) {
      console.error('Invalid email format:', registrationData.Email);
      return throwError(() => new Error('Please enter a valid email address'));
    }
    
    console.log('Sending to backend:', JSON.stringify(registrationData, null, 2));
    console.log('Headers:', this.getHttpOptions().headers);
    console.log('========================');
    
    return this.http.post(apiUrl + 'users', registrationData, this.getHttpOptions()).pipe(
      map((response) => {
        console.log('✅ SUCCESS! Registration response:', response);
        return this.extractResponseData(response);
      }),
      catchError((error) => {
        console.error('❌ REGISTRATION FAILED');
        console.error('Status:', error.status);
        console.error('Status Text:', error.statusText);
        console.error('Error body:', error.error);
        console.error('Full error:', error);
        
        // Try to provide specific guidance based on the error
        if (error.status === 500) {
          console.error('🔥 BACKEND ERROR: The server has an internal issue');
          console.error('Possible causes:');
          console.error('- Database connection issues');
          console.error('- Missing environment variables on Heroku');
          console.error('- Backend validation failing');
          console.error('- Database schema mismatch');
          
          // Try alternative data format
          return this.tryAlternativeRegistration(userDetails);
        }
        
        return this.handleError(error);
      })
    );
  }

  // Try registration with alternative data formats
  private tryAlternativeRegistration(userDetails: any): Observable<any> {
    console.log('🔄 Trying alternative registration format...');
    
    // Try with lowercase field names (some APIs expect this)
    const altData = {
      username: String(userDetails.Username).trim(),
      password: String(userDetails.Password),
      email: String(userDetails.Email).trim().toLowerCase(),
      birthday: userDetails.Birthday || '1990-01-01'
    };
    
    console.log('Alternative format:', JSON.stringify(altData, null, 2));
    
    return this.http.post(apiUrl + 'users', altData, this.getHttpOptions()).pipe(
      map((response) => {
        console.log('✅ Alternative format worked!', response);
        return this.extractResponseData(response);
      }),
      catchError((error) => {
        console.error('❌ Alternative format also failed');
        return this.handleError(error);
      })
    );
  }

  // User login
  public userLogin(userDetails: any): Observable<any> {
    console.log('Login attempt with data:', userDetails);
    console.log('API URL:', apiUrl + 'login');
    return this.http.post(apiUrl + 'login', userDetails, this.getHttpOptions()).pipe(
      map((resp: any) => {
        if (resp && resp.token) {
          localStorage.setItem('token', resp.token);
        }
        if (resp && resp.user) {
          localStorage.setItem('user', JSON.stringify(resp.user));
        }
        return resp;
      }),
      catchError(this.handleError.bind(this))
    );
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get(apiUrl + 'movies', { headers }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError.bind(this))
    );
  }

  // Get one movie
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get(apiUrl + 'movies/' + title, { headers }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError.bind(this))
    );
  }

  // Get director
  public getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get(apiUrl + 'directors/' + name, { headers }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError.bind(this))
    );
  }

  // Get genre
  public getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get(apiUrl + 'genres/' + name, { headers }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError.bind(this))
    );
  }

  // Get user
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get(apiUrl + 'users/' + username, { headers }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError.bind(this))
    );
  }

  // Get favourite movies for a user
  public getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get(apiUrl + 'users/' + username + '/movies', { headers }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError.bind(this))
    );
  }

  // Add a movie to favourite Movies
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, {}, { headers }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError.bind(this))
    );
  }

  // Edit user
  public editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.put(apiUrl + 'users/' + username, userDetails, { headers }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError.bind(this))
    );
  }

  // Delete user
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete(apiUrl + 'users/' + username, { headers }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError.bind(this))
    );
  }

  // Delete a movie from the favorite movies
  public deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, { headers }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError.bind(this))
    );
  }

  // Helper to extract response data
  private extractResponseData(res: any): any {
    return res || {};
  }

  private handleError(error: HttpErrorResponse): any {
    // Log full error for diagnostics
    if (error.error instanceof ErrorEvent) {
      console.error('Client/network error occurred:', error.error.message);
    } else {
      console.error(`HTTP Error Status: ${error.status}`);
      
      // Handle CORS errors specifically
      if (error.status === 0) {
        console.error('CORS Error: The server may not be configured to allow requests from this origin');
        console.error('Make sure the backend has proper CORS headers configured');
      }
      
      try {
        console.error('Error body:', JSON.stringify(error.error));
      } catch {
        console.error('Error body (non-JSON):', error.error);
      }
      console.error('Full error object:', error);
    }
    // Rethrow the original error so callers can handle specific HTTP status / body.
    return throwError(() => error);
  }
}
