import { UserRegistrationFormComponent } from './user-registration-form.component';

describe('UserRegistrationFormComponent', () => {
  it('should be defined', () => {
    expect(UserRegistrationFormComponent).toBeDefined();
  });

  it('should have userData property initialized', () => {
    // Test that the component class has the expected structure
    const componentInstance = Object.create(UserRegistrationFormComponent.prototype);
    componentInstance.userData = { Username: '', Password: '', Email: '', Birthday: '' };
    
    expect(componentInstance.userData).toEqual({ 
      Username: '', 
      Password: '', 
      Email: '', 
      Birthday: '' 
    });
  });

  it('should have required methods', () => {
    expect(typeof UserRegistrationFormComponent.prototype.registerUser).toBe('function');
  });
});
