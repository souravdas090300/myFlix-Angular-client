import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserRegistrationForm } from './user-registration-form/user-registration-form';
import { UserLoginForm } from './user-login-form/user-login-form';
import { WelcomePage } from './welcome-page/welcome-page';
import { MovieCard } from './movie-card/movie-card';
import { UserProfile } from './user-profile/user-profile';
import { MovieDetailsDialog } from './movie-details-dialog/movie-details-dialog';
import { GenreDialog } from './genre-dialog/genre-dialog';
import { DirectorDialog } from './director-dialog/director-dialog';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePage },
  { path: 'movies', component: MovieCard },
  { path: 'profile', component: UserProfile },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationForm,
    UserLoginForm,
    WelcomePage,
    MovieCard,
    UserProfile,
    MovieDetailsDialog,
    GenreDialog,
    DirectorDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }