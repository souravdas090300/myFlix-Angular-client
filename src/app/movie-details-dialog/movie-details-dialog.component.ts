import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details-dialog',
  standalone: false,
  template: `
    <div class="movie-details-dialog">
      <h2 mat-dialog-title>{{ data.Title }}</h2>
      <mat-dialog-content>
        <div class="movie-content">
          <img [src]="data.ImagePath" [alt]="data.Title" class="movie-image" />
          <div class="movie-info">
            <p><strong>Description:</strong></p>
            <p>{{ data.Description }}</p>
            <p><strong>Genre:</strong> {{ data.Genre.Name }}</p>
            <p><strong>Director:</strong> {{ data.Director.Name }}</p>
            <p *ngIf="data.Featured"><strong>Featured Movie</strong></p>
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
        flex-direction: column;
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
  ) {}
}
