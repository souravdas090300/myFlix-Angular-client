import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
// Mock service for development - replace with your actual API URL when backend is ready
const apiUrl = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    // Mock response for testing
    console.log('Mock user registration:', userDetails);
    return of({ user: userDetails, message: 'User registered successfully!' });
  }

  // User login
  public userLogin(userDetails: any): Observable<any> {
    // Mock response for testing
    console.log('Mock user login:', userDetails);
    const mockResponse = {
      user: { username: userDetails.Username, email: 'test@example.com' },
      token: 'mock-jwt-token-12345'
    };
    // Store mock token for other requests
    localStorage.setItem('token', mockResponse.token);
    localStorage.setItem('user', JSON.stringify(mockResponse.user));
    return of(mockResponse);
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    // Mock movie data for testing - expanded for better display
    const mockMovies = [
      {
        _id: '1',
        Title: 'The Shawshank Redemption',
        Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        Genre: { Name: 'Drama', Description: 'Drama movies are serious presentations of realistic characters in conflict.' },
        Director: { Name: 'Frank Darabont', Bio: 'American film director, screenwriter and producer.', Birth: '1959-01-28', Death: null },
        ImagePath: 'https://via.placeholder.com/300x400/0077be/ffffff?text=Shawshank+Redemption',
        Featured: true
      },
      {
        _id: '2',
        Title: 'The Godfather',
        Description: 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.',
        Genre: { Name: 'Crime', Description: 'Crime movies focus on the lives of criminals and law enforcement.' },
        Director: { Name: 'Francis Ford Coppola', Bio: 'American film director, producer, and screenwriter.', Birth: '1939-04-07', Death: null },
        ImagePath: 'https://via.placeholder.com/300x400/8B0000/ffffff?text=The+Godfather',
        Featured: true
      },
      {
        _id: '3',
        Title: 'The Dark Knight',
        Description: 'When the menace known as the Joker emerges, Batman must accept one of the greatest psychological tests.',
        Genre: { Name: 'Action', Description: 'Action movies are fast-paced and include a lot of action sequences.' },
        Director: { Name: 'Christopher Nolan', Bio: 'British-American film director, producer, and screenwriter.', Birth: '1970-07-30', Death: null },
        ImagePath: 'https://via.placeholder.com/300x400/000000/ffffff?text=Dark+Knight',
        Featured: false
      },
      {
        _id: '4',
        Title: 'Pulp Fiction',
        Description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine.',
        Genre: { Name: 'Crime', Description: 'Crime movies focus on the lives of criminals and law enforcement.' },
        Director: { Name: 'Quentin Tarantino', Bio: 'American film director, screenwriter, and producer.', Birth: '1963-03-27', Death: null },
        ImagePath: 'https://via.placeholder.com/300x400/FF4500/ffffff?text=Pulp+Fiction',
        Featured: true
      },
      {
        _id: '5',
        Title: 'Forrest Gump',
        Description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man.',
        Genre: { Name: 'Drama', Description: 'Drama movies are serious presentations of realistic characters in conflict.' },
        Director: { Name: 'Robert Zemeckis', Bio: 'American film director, screenwriter and producer.', Birth: '1952-05-14', Death: null },
        ImagePath: 'https://via.placeholder.com/300x400/32CD32/ffffff?text=Forrest+Gump',
        Featured: true
      },
      {
        _id: '6',
        Title: 'Inception',
        Description: 'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.',
        Genre: { Name: 'Sci-Fi', Description: 'Science fiction movies explore futuristic concepts and technologies.' },
        Director: { Name: 'Christopher Nolan', Bio: 'British-American film director, producer, and screenwriter.', Birth: '1970-07-30', Death: null },
        ImagePath: 'https://via.placeholder.com/300x400/4169E1/ffffff?text=Inception',
        Featured: false
      }
    ];
    console.log('Mock movies data loaded:', mockMovies);
    return of(mockMovies);
  }

  // Get one movie
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get director
  public getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get genre
  public getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get user
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get favourite movies for a user
  public getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username + '/movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Add a movie to favourite Movies
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Edit user
  public editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete user
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete a movie from the favorite movies
  public deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Helper to extract response data
  private extractResponseData(res: any): any {
    return res || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
