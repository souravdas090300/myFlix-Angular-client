import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details-dialog',
  standalone: false,
  templateUrl: './movie-details-dialog.html',
  styleUrls: ['./movie-details-dialog.scss']
})
export class MovieDetailsDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { movie: any }
  ) { }
}
