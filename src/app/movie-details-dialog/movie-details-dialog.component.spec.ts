import { MovieDetailsDialogComponent } from './movie-details-dialog.component';

describe('MovieDetailsDialogComponent', () => {
  it('should be defined', () => {
    expect(MovieDetailsDialogComponent).toBeDefined();
  });

  it('should have constructor that accepts MAT_DIALOG_DATA', () => {
    expect(MovieDetailsDialogComponent.length).toBe(1); // constructor expects 1 parameter
  });
});
