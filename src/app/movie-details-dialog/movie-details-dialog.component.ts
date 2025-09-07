import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details-dialog',
  standalone: false,
  template: `
    <div class="movie-details-dialog">
      <h2 mat-dialog-title>{{ data?.Title || 'Movie Details' }}</h2>
      <mat-dialog-content>
        <div class="movie-content">
          <img [src]="data?.ImagePath" [alt]="data?.Title" class="movie-image" *ngIf="data?.ImagePath" />
          <div class="movie-info">
            <p><strong>Description:</strong></p>
            <p>{{ data?.Description || 'No description available.' }}</p>
            <p><strong>Genre:</strong> {{ data?.Genre?.Name || 'Unknown' }}</p>
            <p><strong>Director:</strong> {{ data?.Director?.Name || 'Unknown' }}</p>
            <p *ngIf="data?.Featured"><strong>Featured Movie</strong></p>
          </div>
        </div>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button mat-dialog-close>Close</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .movie-details-dialog {
      max-width: 600px;
    }
    .movie-content {
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }
    .movie-image {
      width: 200px;
      height: 300px;
      object-fit: cover;
      border-radius: 8px;
    }
    .movie-info {
      flex: 1;
    }
    mat-dialog-content {
      padding: 20px 0;
    }
    @media (max-width: 600px) {
      .movie-content {
      }
      .movie-image {
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class MovieDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Movie details dialog data:', data);
  }
}
