import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-dialog',
  standalone: false,
  template: `
    <div class="director-dialog">
      <h2 mat-dialog-title>{{ data.Name }}</h2>
      <mat-dialog-content>
        <p><strong>Biography:</strong></p>
        <p>{{ data.Bio }}</p>
        <p *ngIf="data.Birth"><strong>Born:</strong> {{ data.Birth }}</p>
        <p *ngIf="data.Death"><strong>Died:</strong> {{ data.Death }}</p>
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
