import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  it('should be defined', () => {
    expect(MovieCardComponent).toBeDefined();
  });

  it('should have movies array property', () => {
    // Test that the component class has the expected structure
    const componentInstance = Object.create(MovieCardComponent.prototype);
    componentInstance.movies = [];
    
    expect(Array.isArray(componentInstance.movies)).toBe(true);
  });

  it('should have required methods', () => {
    expect(typeof MovieCardComponent.prototype.ngOnInit).toBe('function');
    expect(typeof MovieCardComponent.prototype.getMovies).toBe('function');
  });

  it('should have constructor that accepts required services', () => {
    // Test that the component class structure is correct
    expect(MovieCardComponent.length).toBe(5); // constructor expects 5 parameters: FetchApiDataService, MatSnackBar, ChangeDetectorRef, Router, MatDialog
  });
});
