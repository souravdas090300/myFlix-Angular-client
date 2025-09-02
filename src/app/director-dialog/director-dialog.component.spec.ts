import { DirectorDialogComponent } from './director-dialog.component';

describe('DirectorDialogComponent', () => {
  it('should be defined', () => {
    expect(DirectorDialogComponent).toBeDefined();
  });

  it('should have constructor that accepts MAT_DIALOG_DATA', () => {
    expect(DirectorDialogComponent.length).toBe(1); // constructor expects 1 parameter
  });
});
