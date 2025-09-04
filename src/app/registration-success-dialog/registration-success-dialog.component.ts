import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registration-success-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Registration Complete</h2>
    <mat-dialog-content>
      <p>User <strong>{{ data?.Username }}</strong> was registered successfully.</p>
      <p>{{ data?.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: [``]
})
export class RegistrationSuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RegistrationSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
