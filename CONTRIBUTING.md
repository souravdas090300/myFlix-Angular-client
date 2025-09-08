# Contributing to myFlix Angular Client

Thank you for your interest in contributing to the myFlix Angular Client project! This document provides guidelines and instructions for contributors.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Setup](#development-setup)
3. [Coding Standards](#coding-standards)
4. [Documentation Requirements](#documentation-requirements)
5. [Testing Guidelines](#testing-guidelines)
6. [Commit Guidelines](#commit-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Issue Reporting](#issue-reporting)

## Getting Started

Before contributing, please:

1. Read the [PROJECT-SETUP.md](./PROJECT-SETUP.md) for detailed setup instructions
2. Familiarize yourself with the project structure and existing codebase
3. Review the [README.md](./README.md) for project overview and features
4. Check existing issues and pull requests to avoid duplicates

## Development Setup

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- Angular CLI (latest)
- Git

### Setup Steps
```bash
# Clone the repository
git clone https://github.com/souravdas090300/myFlix-Angular-client.git
cd myFlix-Angular-client

# Install dependencies
npm install

# Start development server
npm run start

# Generate and view documentation
npm run docs
npm run docs:serve
```

## Coding Standards

### TypeScript/Angular Guidelines

1. **Follow Angular Style Guide**: Adhere to the [official Angular style guide](https://angular.io/guide/styleguide)

2. **Component Structure**:
   ```typescript
   /**
    * Component description with clear purpose
    */
   @Component({
     selector: 'app-component-name',
     templateUrl: './component.html',
     styleUrls: ['./component.scss']
   })
   export class ComponentName implements OnInit {
     // Properties first, then constructor, then methods
   }
   ```

3. **Naming Conventions**:
   - Components: PascalCase (e.g., `UserProfileComponent`)
   - Methods: camelCase (e.g., `getUserData()`)
   - Properties: camelCase (e.g., `isLoading`)
   - Constants: SCREAMING_SNAKE_CASE (e.g., `API_BASE_URL`)

4. **File Organization**:
   - One component per file
   - Descriptive file names
   - Logical folder structure

### Code Quality

1. **No Console Logs**: Remove `console.log()` statements before committing (except for error logging)

2. **Error Handling**: Implement proper error handling for all API calls and user interactions

3. **Type Safety**: Use TypeScript types instead of `any` when possible

4. **Performance**: Avoid unnecessary re-renders and optimize for performance

## Documentation Requirements

### TypeDoc Comments

All public classes, methods, and properties must have TypeDoc documentation:

```typescript
/**
 * Brief description of the method's purpose
 * 
 * Detailed description if needed, explaining complex logic,
 * business rules, or important implementation details.
 * 
 * @param paramName - Description of parameter and its constraints
 * @param optionalParam - Description of optional parameter
 * @returns Description of return value and possible states
 * 
 * @throws Description of when and why exceptions might be thrown
 * 
 * @example
 * ```typescript
 * // Practical usage example
 * const result = this.methodName('example', true);
 * ```
 * 
 * @since Version when this method was added (if applicable)
 */
methodName(paramName: string, optionalParam?: boolean): ReturnType {
  // Implementation
}
```

### Required Documentation Elements

1. **Component Documentation**:
   - Purpose and functionality
   - Input properties with `@param`
   - Output events with `@returns`
   - Usage examples
   - Dependencies and requirements

2. **Service Documentation**:
   - API endpoints used
   - Authentication requirements
   - Error handling approach
   - Return data structures

3. **Method Documentation**:
   - Parameters and types
   - Return values
   - Side effects
   - Error conditions
   - Usage examples

### Documentation Generation

Always regenerate documentation after making changes:

```bash
npm run docs
```

Review generated documentation at `docs/index.html` to ensure completeness.

## Testing Guidelines

### Unit Testing

1. **Test Coverage**: Aim for meaningful test coverage, focusing on:
   - Component initialization
   - Public methods
   - User interactions
   - Error handling
   - Edge cases

2. **Test Structure**:
   ```typescript
   describe('ComponentName', () => {
     let component: ComponentName;
     let fixture: ComponentFixture<ComponentName>;

     beforeEach(() => {
       // Setup test bed
     });

     it('should create component', () => {
       expect(component).toBeTruthy();
     });

     it('should handle user input correctly', () => {
       // Test specific functionality
     });
   });
   ```

3. **Mocking**: Mock external dependencies (HTTP calls, services)

4. **Running Tests**:
   ```bash
   npm run test
   npm run test -- --code-coverage
   ```

### Integration Testing

Test component interactions and API communication in a controlled environment.

## Commit Guidelines

### Commit Message Format

Follow conventional commit format:

```
type(scope): brief description

Detailed explanation of changes (if needed)

- List specific changes
- Include breaking changes
- Reference issue numbers
```

### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Examples
```
feat(user-profile): add email validation to profile form

- Implement regex-based email validation
- Add error messages for invalid emails
- Update unit tests for validation logic

Closes #123
```

```
docs(api): update TypeDoc comments for FetchApiDataService

- Add missing parameter documentation
- Include usage examples for complex methods
- Fix return type descriptions
```

## Pull Request Process

### Before Submitting

1. **Update Documentation**: Ensure all new code is documented
2. **Run Tests**: All tests must pass
3. **Generate Docs**: Run `npm run docs` and review output
4. **Code Style**: Follow established coding standards
5. **No Conflicts**: Resolve any merge conflicts

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (specify):

## Testing
- [ ] Unit tests added/updated
- [ ] All tests pass
- [ ] Manual testing completed

## Documentation
- [ ] TypeDoc comments added/updated
- [ ] README updated (if needed)
- [ ] Documentation generated and reviewed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] No console.log statements
- [ ] Error handling implemented
- [ ] Breaking changes documented
```

### Review Process

1. **Automated Checks**: Ensure CI passes
2. **Code Review**: Address reviewer feedback
3. **Documentation Review**: Verify docs are complete and accurate
4. **Final Testing**: Test the changes in development environment

## Issue Reporting

### Bug Reports

Include the following information:

1. **Environment Details**:
   - Operating system
   - Node.js version
   - npm version
   - Browser (if applicable)

2. **Steps to Reproduce**:
   - Detailed step-by-step instructions
   - Expected vs actual behavior
   - Screenshots or error messages

3. **Code Examples**:
   - Minimal reproduction case
   - Relevant code snippets

### Feature Requests

1. **Use Case**: Explain why this feature is needed
2. **Proposed Solution**: Describe your idea
3. **Alternatives**: Any alternative approaches considered
4. **Implementation**: Suggestions for implementation

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to docs
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed
- `question`: Further information requested

## Code Review Checklist

### For Reviewers

- [ ] Code follows established patterns and conventions
- [ ] Documentation is comprehensive and accurate
- [ ] Tests are appropriate and sufficient
- [ ] No security vulnerabilities introduced
- [ ] Performance implications considered
- [ ] Breaking changes properly documented
- [ ] Error handling is robust

### For Contributors

Before requesting review:

- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] Code style consistent
- [ ] No temporary debugging code
- [ ] Commit messages are clear
- [ ] Pull request description is complete

## Development Best Practices

### Angular Specific

1. **Component Communication**:
   - Use `@Input()` and `@Output()` for parent-child communication
   - Use services for sibling component communication
   - Implement proper change detection strategies

2. **State Management**:
   - Keep component state minimal
   - Use services for shared state
   - Implement proper cleanup in `ngOnDestroy`

3. **Performance**:
   - Use `OnPush` change detection when appropriate
   - Implement trackBy functions for lists
   - Avoid heavy operations in templates

4. **Accessibility**:
   - Include proper ARIA labels
   - Ensure keyboard navigation works
   - Test with screen readers

### General Guidelines

1. **Security**: Validate all user inputs and sanitize data
2. **Error Boundaries**: Implement global error handling
3. **Loading States**: Provide feedback during async operations
4. **Responsive Design**: Ensure compatibility across devices
5. **Browser Support**: Test in multiple browsers

## Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeDoc Documentation](https://typedoc.org/)
- [Angular Material](https://material.angular.io/)
- [RxJS Documentation](https://rxjs.dev/)

## Questions and Support

If you have questions about contributing:

1. Check existing issues and documentation
2. Create a new issue with the `question` label
3. Be specific about what you need help with
4. Include relevant code examples or error messages

---

Thank you for contributing to the myFlix Angular Client project! Your contributions help make this project better for everyone.
