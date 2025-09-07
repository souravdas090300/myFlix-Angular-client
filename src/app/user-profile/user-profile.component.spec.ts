import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let mockFetchApiData: any;
  let mockSnackBar: any;
  let mockRouter: any;

  beforeEach(() => {
    mockFetchApiData = jasmine.createSpyObj(['getAllMovies', 'editUser', 'deleteUser', 'deleteFavouriteMovie']);
    mockSnackBar = jasmine.createSpyObj(['open']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    component = new UserProfileComponent(mockFetchApiData, mockSnackBar, mockRouter);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required methods', () => {
    expect(typeof component.ngOnInit).toBe('function');
    expect(typeof component.getUser).toBe('function');
    expect(typeof component.updateUser).toBe('function');
    expect(typeof component.deleteUser).toBe('function');
    expect(typeof component.logout).toBe('function');
  });

  describe('getUser', () => {
    it('should set user data when valid user exists in localStorage', () => {
      const userData = { Username: 'testuser', Email: 'test@example.com' };
      spyOn(localStorage, 'getItem').and.callFake((key: string) => {
        return key === 'user' ? JSON.stringify(userData) : 'token123';
      });
      
      component.getUser();
      
      expect(component.user).toEqual(userData);
      expect(component.originalUser).toEqual(userData);
    });

    it('should redirect to welcome when no user data exists', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      
      component.getUser();
      
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/welcome']);
      expect(mockSnackBar.open).toHaveBeenCalledWith('Please log in to view your profile', 'OK', jasmine.any(Object));
    });
  });

  describe('updateUser', () => {
    it('should show error when username or email is missing', () => {
      component.user = { Username: '', Email: '' };
      
      component.updateUser();
      
      expect(mockSnackBar.open).toHaveBeenCalledWith('Username and Email are required', 'OK', jasmine.any(Object));
      expect(mockFetchApiData.editUser).not.toHaveBeenCalled();
    });

    it('should call API and update user when form is valid', () => {
      const userData = { Username: 'testuser', Email: 'test@example.com' };
      component.user = userData;
      mockFetchApiData.editUser.and.returnValue({
        subscribe: (successCallback: any) => successCallback(userData)
      });
      
      component.updateUser();
      
      expect(mockFetchApiData.editUser).toHaveBeenCalledWith(userData);
      expect(mockSnackBar.open).toHaveBeenCalledWith('Profile updated successfully!', 'OK', jasmine.any(Object));
    });
  });
});