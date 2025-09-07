import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Genre dialog data:', data);
  }
}
