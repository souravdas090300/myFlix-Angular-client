import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private mockUsers: any[] = [];
  private mockMovies = [
    {
      _id: '1',
      Title: 'The Matrix',
      Description: 'A computer hacker learns from mysterious rebels about the true nature of his reality.',
      Genre: { Name: 'Sci-Fi', Description: 'Science Fiction movies' },
      Director: { Name: 'The Wachowskis', Bio: 'Filmmaking duo known for innovative sci-fi films' },
      ImagePath: 'matrix.jpg',
      Featured: true
    },
    {
      _id: '2',
      Title: 'Inception',
      Description: 'A thief who steals corporate secrets through dream-sharing technology.',
      Genre: { Name: 'Thriller', Description: 'Suspenseful movies' },
      Director: { Name: 'Christopher Nolan', Bio: 'British-American film director known for complex narratives' },
      ImagePath: 'inception.jpg',
      Featured: true
    },
    {
      _id: '3',
      Title: 'Interstellar',
      Description: 'A team of explorers travel through a wormhole in space.',
      Genre: { Name: 'Sci-Fi', Description: 'Science Fiction movies' },
      Director: { Name: 'Christopher Nolan', Bio: 'British-American film director known for complex narratives' },
      ImagePath: 'interstellar.jpg',
      Featured: false
    }
  ];

  constructor() {}

  // Mock user registration
  userRegistration(userDetails: any): Observable<any> {
    console.log('🎭 MOCK: User registration with data:', userDetails);
    
    // Simulate network delay
    return of({
      _id: 'mock_' + Date.now(),
      Username: userDetails.Username,
      Email: userDetails.Email,
      Birthday: userDetails.Birthday,
      FavoriteMovies: []
    }).pipe(delay(1000));
  }

  // Mock user login
  userLogin(userDetails: any): Observable<any> {
    console.log('🎭 MOCK: User login with data:', userDetails);
    
    const mockResponse = {
      token: 'mock_token_' + Date.now(),
      user: {
        _id: 'mock_user_id',
        Username: userDetails.Username,
        Email: 'user@example.com',
        Birthday: '1990-01-01',
        FavoriteMovies: []
      }
    };
    
    return of(mockResponse).pipe(delay(800));
  }

  // Mock get all movies
  getAllMovies(): Observable<any> {
    console.log('🎭 MOCK: Getting all movies');
    return of(this.mockMovies).pipe(delay(600));
  }

  // Mock get one movie
  getOneMovie(title: string): Observable<any> {
    console.log('🎭 MOCK: Getting movie:', title);
    const movie = this.mockMovies.find(m => m.Title.toLowerCase() === title.toLowerCase());
    return movie ? of(movie).pipe(delay(400)) : throwError(() => new Error('Movie not found'));
  }

  // Mock get director
  getDirector(directorName: string): Observable<any> {
    console.log('🎭 MOCK: Getting director:', directorName);
    const director = {
      Name: directorName,
      Bio: 'A talented film director with many acclaimed works.',
      Birth: '1970-01-01'
    };
    return of(director).pipe(delay(400));
  }

  // Mock get genre
  getGenre(genreName: string): Observable<any> {
    console.log('🎭 MOCK: Getting genre:', genreName);
    const genre = {
      Name: genreName,
      Description: `${genreName} is a popular movie genre with many great films.`
    };
    return of(genre).pipe(delay(400));
  }

  // Mock add/remove favorite movie
  addFavoriteMovie(username: string, movieId: string): Observable<any> {
    console.log('🎭 MOCK: Adding favorite movie:', movieId, 'for user:', username);
    return of({ message: 'Movie added to favorites' }).pipe(delay(500));
  }

  deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    console.log('🎭 MOCK: Removing favorite movie:', movieId, 'for user:', username);
    return of({ message: 'Movie removed from favorites' }).pipe(delay(500));
  }

  // Mock update user
  editUser(username: string, userDetails: any): Observable<any> {
    console.log('🎭 MOCK: Updating user:', username, userDetails);
    return of({
      _id: 'mock_user_id',
      Username: username,
      ...userDetails
    }).pipe(delay(700));
  }

  // Mock delete user
  deleteUser(username: string): Observable<any> {
    console.log('🎭 MOCK: Deleting user:', username);
    return of({ message: 'User deleted successfully' }).pipe(delay(500));
  }
}
