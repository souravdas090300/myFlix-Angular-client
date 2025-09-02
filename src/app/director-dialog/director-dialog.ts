import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-dialog',
  standalone: false,
  templateUrl: './director-dialog.html',
  styleUrls: ['./director-dialog.scss']
})
export class DirectorDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { director: any }
  ) { }
}
