import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Genre Dialog Component for displaying movie genre information
 * 
 * This component renders a modal dialog that displays detailed information
 * about a movie genre, including the genre name and description.
 * The dialog is opened from the movie card component when a user clicks
 * on a genre button.
 * 
 * @example
 * ```typescript
 * this.dialog.open(GenreDialogComponent, {
 *   data: { Name: 'Action', Description: 'High-energy films...' },
 *   width: '400px'
 * });
 * ```
 */
@Component({
  selector: 'app-genre-dialog',
  standalone: false,
  template: `
    <div class="genre-dialog">
      <h2 mat-dialog-title>{{ data?.Name || 'Genre Information' }}</h2>
      <mat-dialog-content>
        <p>{{ data?.Description || 'No description available.' }}</p>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button mat-dialog-close>Close</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .genre-dialog {
      max-width: 400px;
    }
    mat-dialog-content {
      padding: 20px 0;
    }
  `]
})
export class GenreDialogComponent {
  /**
   * Constructor for GenreDialogComponent
   * 
   * @param data - Genre data injected from the parent component containing Name and Description
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Genre dialog data:', data);
  }
}
