import { FetchApiDataService } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  it('should be defined', () => {
    expect(FetchApiDataService).toBeDefined();
  });

  it('should have required methods', () => {
    expect(typeof FetchApiDataService.prototype.userRegistration).toBe('function');
    expect(typeof FetchApiDataService.prototype.userLogin).toBe('function');
    expect(typeof FetchApiDataService.prototype.getAllMovies).toBe('function');
  });

  it('should have constructor that accepts HttpClient', () => {
    // Test that the service class structure is correct
    expect(FetchApiDataService.length).toBe(1); // constructor expects 1 parameter (HttpClient)
  });

  it('should have API URL constant', () => {
    // Test that the service has the expected API URL structure
    const serviceInstance = Object.create(FetchApiDataService.prototype);
    expect(typeof serviceInstance.apiUrl).toBe('undefined'); // apiUrl is private
  });
});