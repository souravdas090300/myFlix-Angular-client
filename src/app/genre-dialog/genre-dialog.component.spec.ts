import { GenreDialogComponent } from './genre-dialog.component';

describe('GenreDialogComponent', () => {
  it('should be defined', () => {
    expect(GenreDialogComponent).toBeDefined();
  });

  it('should have constructor that accepts MAT_DIALOG_DATA', () => {
    expect(GenreDialogComponent.length).toBe(1); // constructor expects 1 parameter
  });
});
