import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchApiDataService } from './fetch-api-data.service';
import { MockApiService } from './mock-api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  // Set to true to use mock API, false to use real backend
  private useMockApi = true; // Change this to switch between mock and real API
  
  constructor(
    private realApiService: FetchApiDataService,
    private mockApiService: MockApiService
  ) {
    if (this.useMockApi) {
      console.log('🎭 API CONFIG: Using MOCK API (backend issues detected)');
      console.log('🔧 To use real API, set useMockApi = false in api-config.service.ts');
    } else {
      console.log('🌐 API CONFIG: Using REAL API');
    }
  }

  // Get the current API service (mock or real)
  private getApiService() {
    return this.useMockApi ? this.mockApiService : this.realApiService;
  }

  // Expose all API methods through this service
  userRegistration(userDetails: any): Observable<any> {
    return this.getApiService().userRegistration(userDetails);
  }

  userLogin(userDetails: any): Observable<any> {
    return this.getApiService().userLogin(userDetails);
  }

  getAllMovies(): Observable<any> {
    return this.getApiService().getAllMovies();
  }

  getOneMovie(title: string): Observable<any> {
    return this.getApiService().getOneMovie(title);
  }

  getDirector(directorName: string): Observable<any> {
    return this.getApiService().getDirector(directorName);
  }

  getGenre(genreName: string): Observable<any> {
    return this.getApiService().getGenre(genreName);
  }

  addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.getApiService().addFavoriteMovie(username, movieId);
  }

  deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.getApiService().deleteFavoriteMovie(username, movieId);
  }

  editUser(username: string, userDetails: any): Observable<any> {
    return this.getApiService().editUser(username, userDetails);
  }

  deleteUser(username: string): Observable<any> {
    return this.getApiService().deleteUser(username);
  }

  // Utility methods
  isUsingMockApi(): boolean {
    return this.useMockApi;
  }

  switchToMockApi(): void {
    this.useMockApi = true;
    console.log('🎭 Switched to MOCK API');
  }

  switchToRealApi(): void {
    this.useMockApi = false;
    console.log('🌐 Switched to REAL API');
  }
}
