import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Director Dialog Component for displaying movie director information
 * 
 * This component renders a modal dialog that displays detailed information
 * about a movie director, including their biography, birth date, and death date
 * (if applicable). The dialog is opened from the movie card component when
 * a user clicks on a director button.
 * 
 * @example
 * ```typescript
 * this.dialog.open(DirectorDialogComponent, {
 *   data: { 
 *     Name: 'Christopher Nolan', 
 *     Bio: 'British-American filmmaker...', 
 *     Birth: '1970-07-30' 
 *   },
 *   width: '500px'
 * });
 * ```
 */
@Component({
  selector: 'app-director-dialog',
  standalone: false,
  template: `
    <div class="director-dialog">
      <h2 mat-dialog-title>{{ data?.Name || 'Director Information' }}</h2>
      <mat-dialog-content>
        <p><strong>Biography:</strong></p>
        <p>{{ data?.Bio || 'No biography available.' }}</p>
        <p *ngIf="data?.Birth"><strong>Born:</strong> {{ formatDate(data.Birth) }}</p>
        <p *ngIf="data?.Death"><strong>Died:</strong> {{ formatDate(data.Death) }}</p>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button mat-dialog-close>Close</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .director-dialog {
      max-width: 500px;
    }
    mat-dialog-content {
      padding: 20px 0;
    }
  `]
})
export class DirectorDialogComponent {
  /**
   * Constructor for DirectorDialogComponent
   * 
   * @param data - Director data injected from parent component containing Name, Bio, Birth, and Death
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Director dialog data:', data);
  }

  /**
   * Formats date strings for user-friendly display
   * 
   * @param dateString - ISO date string to format
   * @returns Formatted date string in localized format or original string if formatting fails
   * 
   * @example
   * ```typescript
   * const formatted = this.formatDate('1970-07-30');
   * // returns 'July 30, 1970'
   * ```
   */
  formatDate(dateString: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  }
}
