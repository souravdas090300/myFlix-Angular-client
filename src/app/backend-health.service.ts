import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendHealthService {
  // Use the same API URL as the main service (through proxy)
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Wake up the backend through proxy (avoids CORS)
   */
  wakeUpBackend(): Observable<boolean> {
    console.log('Attempting to wake up backend through proxy...');
    // Try a simple GET request through the proxy
    return this.http.get(`${this.apiUrl}movies`, { 
      headers: { 'Accept': 'application/json' }
    }).pipe(
      map(() => {
        console.log('✅ Backend is awake');
        return true;
      }),
      catchError((error) => {
        console.log('Backend wake-up attempt made (expected 401 for movies without auth)');
        // 401 is expected for movies without auth - means backend is awake
        if (error.status === 401) {
          return of(true);
        }
        console.warn('Backend wake-up had issues:', error.status);
        return of(false);
      })
    );
  }

  /**
   * Check if backend is healthy through proxy
   */
  checkHealth(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}movies`, { 
      headers: { 'Accept': 'application/json' }
    }).pipe(
      map(() => true),
      catchError((error) => {
        // 401 means backend is working but requires auth
        return of(error.status === 401);
      })
    );
  }
}
