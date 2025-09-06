import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  it('should be defined', () => {
    expect(UserProfileComponent).toBeDefined();
  });

  it('should have required methods', () => {
    expect(typeof UserProfileComponent.prototype.ngOnInit).toBe('function');
    expect(typeof UserProfileComponent.prototype.getUser).toBe('function');
    expect(typeof UserProfileComponent.prototype.updateUser).toBe('function');
    expect(typeof UserProfileComponent.prototype.deleteUser).toBe('function');
    expect(typeof UserProfileComponent.prototype.logOut).toBe('function');
  });

  it('should have constructor that accepts required services', () => {
    expect(UserProfileComponent.length).toBe(3); // constructor expects 3 parameters
  });
});
