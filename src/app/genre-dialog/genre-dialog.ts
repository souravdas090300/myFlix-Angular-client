import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-dialog',
  standalone: false,
  templateUrl: './genre-dialog.html',
  styleUrls: ['./genre-dialog.scss']
})
export class GenreDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { genre: any }
  ) { }
}
