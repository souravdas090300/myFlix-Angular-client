import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';

/**
 * Application routes configuration
 * 
 * Defines the routing structure for the myFlix Angular application.
 * Includes public routes (welcome, login, register) and protected routes
 * (movies, profile) that should require authentication in a production environment.
 * 
 * Route Structure:
 * - `/welcome` - Landing page with authentication options
 * - `/movies` - Main movie catalog (should be protected)
 * - `/profile` - User profile management (should be protected)  
 * - `/login` - Direct login page route
 * - `/register` - Direct registration page route
 * - `/` - Redirects to welcome page
 * - `**` - Wildcard route redirects to welcome page
 */
const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'login', component: UserLoginFormComponent },
  { path: 'register', component: UserRegistrationFormComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome' }
];

/**
 * App Routing Module
 * 
 * Configures and exports the router for the myFlix application.
 * This module is imported by the main AppModule to enable navigation
 * between different views and components.
 * 
 * Note: In a production environment, consider adding route guards
 * to protect authenticated routes (movies, profile) from unauthorized access.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }