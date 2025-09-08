# myFlix Angular Client - Project Setup Manual

This document provides comprehensive instructions for developers to set up, run, and contribute to the myFlix Angular client project.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Development Environment](#development-environment)
4. [Project Structure](#project-structure)
5. [Configuration Files](#configuration-files)
6. [Available Scripts](#available-scripts)
7. [Development Workflow](#development-workflow)
8. [API Integration](#api-integration)
9. [Testing](#testing)
10. [Documentation](#documentation)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

### Required Software

- **Node.js**: Version 18.x or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm**: Version 9.x or higher (comes with Node.js)
  - Verify installation: `npm --version`
  - Update if needed: `npm install -g npm@latest`

- **Angular CLI**: Latest version
  ```bash
  npm install -g @angular/cli
  ```
  - Verify installation: `ng version`

- **Git**: For version control
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### Recommended Tools

- **VS Code**: Recommended IDE with Angular extensions
- **Chrome DevTools**: For debugging
- **Postman**: For API testing (optional)

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/souravdas090300/myFlix-Angular-client.git
cd myFlix-Angular-client
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies listed in `package.json` including:
- Angular core and common modules
- Angular Material UI components
- TypeScript and development tools
- TypeDoc for documentation generation

### 3. Environment Configuration

The project includes environment configurations in `src/environments/`:

- `environment.ts` - Development environment
- `environment.prod.ts` - Production environment

No additional configuration is required as the API URL is configured in the service files.

### 4. Verify Installation

```bash
ng serve
```

The application should start on `http://localhost:4200/`

## Development Environment

### Project Dependencies

#### Core Angular Dependencies
- `@angular/core` - Angular core framework
- `@angular/common` - Common Angular directives and pipes
- `@angular/router` - Routing functionality
- `@angular/forms` - Form handling (Template-driven and Reactive)
- `@angular/platform-browser` - Browser platform support
- `@angular/animations` - Animation support

#### Angular Material Dependencies
- `@angular/material` - Material Design components
- `@angular/cdk` - Component Development Kit

#### HTTP Communication
- `@angular/common/http` - HTTP client for API communication

#### Development Tools
- `typescript` - TypeScript compiler
- `typedoc` - Documentation generation
- `@angular-devkit/build-angular` - Build tools

### TypeScript Configuration

The project uses TypeScript with the following configurations:
- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.spec.json` - Test-specific settings

## Project Structure

```
myFlix-Angular-client/
├── src/
│   ├── app/
│   │   ├── components/                 # Application components
│   │   │   ├── app/                   # Root app component
│   │   │   ├── welcome-page/          # Landing page
│   │   │   ├── user-registration-form/ # Registration modal
│   │   │   ├── user-login-form/       # Login modal
│   │   │   ├── movie-card/            # Movie list display
│   │   │   ├── movie-details-dialog/  # Movie details modal
│   │   │   ├── director-dialog/       # Director info modal
│   │   │   ├── genre-dialog/          # Genre info modal
│   │   │   └── user-profile/          # User profile management
│   │   ├── services/
│   │   │   └── fetch-api-data.service.ts  # API communication
│   │   ├── app.module.ts              # Main application module
│   │   └── app-routing.module.ts      # Routing configuration
│   ├── assets/                        # Static assets
│   ├── environments/                  # Environment configurations
│   ├── index.html                     # Main HTML file
│   ├── main.ts                        # Application entry point
│   ├── polyfills.ts                   # Browser compatibility
│   └── styles.scss                    # Global styles
├── docs/                              # Generated TypeDoc documentation
├── angular.json                       # Angular CLI configuration
├── package.json                       # Dependencies and scripts
├── tsconfig.json                      # TypeScript configuration
├── typedoc.json                       # TypeDoc configuration
└── README.md                          # Project overview
```

## Configuration Files

### angular.json
Main Angular CLI configuration file that defines:
- Build configurations for development and production
- Asset paths and global styles
- Testing configurations
- Deployment settings for GitHub Pages

### package.json
Defines project metadata, dependencies, and npm scripts:
- Dependencies for runtime
- DevDependencies for development tools
- Scripts for building, testing, and deployment

### typedoc.json
Configuration for TypeDoc documentation generation:
- Entry points for documentation scanning
- Output directory (`docs/`)
- Exclusions for test files
- Theme and formatting options

## Available Scripts

### Development Scripts
```bash
# Start development server (default port 4200)
npm run start
npm run dev-app

# Start with proxy configuration (for CORS handling)
npm run dev

# Start development with proxy server
npm run dev-with-proxy
```

### Build Scripts
```bash
# Build for production
npm run build

# Build for GitHub Pages deployment
npm run build-gh
```

### Documentation Scripts
```bash
# Generate TypeDoc documentation
npm run docs

# Serve documentation locally on port 3001
npm run docs:serve
```

### Testing Scripts
```bash
# Run unit tests
npm run test

# Run unit tests with watch mode
npm run watch
```

### Deployment Scripts
```bash
# Deploy to GitHub Pages
npm run deploy

# Build and serve for production testing
npm run serve:ssr:myFlix-Angular-client
```

## Development Workflow

### 1. Starting Development

```bash
# Navigate to project directory
cd myFlix-Angular-client

# Install/update dependencies
npm install

# Start development server
npm run start
```

### 2. Making Changes

1. **Component Development**: Add/modify components in `src/app/`
2. **Service Updates**: Update API calls in `fetch-api-data.service.ts`
3. **Styling**: Update component styles in respective `.scss` files
4. **Routing**: Modify routes in `app-routing.module.ts`

### 3. Code Documentation

Always add TypeDoc comments when creating new components or methods:

```typescript
/**
 * Brief description of the component/method
 * 
 * @param paramName - Description of parameter
 * @returns Description of return value
 * 
 * @example
 * ```typescript
 * // Usage example
 * ```
 */
```

### 4. Testing Changes

```bash
# Run the application locally
npm run start

# Generate and review documentation
npm run docs
npm run docs:serve
```

### 5. Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm run serve:ssr:myFlix-Angular-client
```

## API Integration

### Backend API
- **Base URL**: `https://movie-flix-fb6c35ebba0a.herokuapp.com/`
- **CORS Proxy**: `https://corsproxy.io/?` (for GitHub Pages)

### API Endpoints Used

1. **Authentication**
   - `POST /users` - User registration
   - `POST /login` - User login

2. **Movies**
   - `GET /movies` - Get all movies
   - `GET /movies/:title` - Get specific movie

3. **Directors & Genres**
   - `GET /movies/director/:name` - Get director info
   - `GET /movies/genre/:name` - Get genre info

4. **User Management**
   - `GET /users/:username` - Get user profile
   - `PUT /users/:username` - Update user profile
   - `DELETE /users/:username` - Delete user account

5. **Favorites**
   - `POST /users/:username/movies/:movieId` - Add to favorites
   - `DELETE /users/:username/movies/:movieId` - Remove from favorites

### Authentication
- JWT tokens stored in localStorage
- Token included in Authorization header for protected routes
- Automatic token validation on app initialization

## Testing

### Unit Testing
The project uses Jasmine and Karma for unit testing:

```bash
# Run tests once
npm run test

# Run tests in watch mode
ng test

# Run tests with coverage report
ng test --code-coverage
```

### Test Files
- Component tests: `*.component.spec.ts`
- Service tests: `*.service.spec.ts`
- Test configuration: `karma.conf.js`

### Testing Guidelines
1. Test component initialization
2. Test public methods
3. Test user interactions
4. Mock external dependencies (HTTP calls)
5. Test error handling

## Documentation

### TypeDoc Documentation
The project uses TypeDoc for generating comprehensive API documentation:

```bash
# Generate documentation
npm run docs

# Serve documentation locally
npm run docs:serve
```

### Documentation Standards
1. **All public classes and methods must have TypeDoc comments**
2. **Include @param for all parameters**
3. **Include @returns for return values**
4. **Provide @example when helpful**
5. **Document complex logic with inline comments**

### Documentation Structure
- Class-level documentation for components and services
- Method-level documentation with parameters and return types
- Example usage where appropriate
- Generated HTML documentation in `docs/` folder

## Deployment

### GitHub Pages Deployment

The project is configured for automatic deployment to GitHub Pages:

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

This script:
1. Builds the application for production
2. Optimizes assets and creates bundles
3. Pushes to the `gh-pages` branch
4. Makes the app available at the configured URL

### Manual Deployment Steps

1. **Build the application**:
   ```bash
   npm run build-gh
   ```

2. **Deploy to hosting platform**:
   - Upload `dist/` folder contents
   - Configure server for single-page application
   - Set up HTTPS (recommended)

### Environment-Specific Builds

- **Development**: `ng serve` (local development)
- **Production**: `npm run build` (optimized build)
- **GitHub Pages**: `npm run build-gh` (with base-href configuration)

## Troubleshooting

### Common Issues

#### 1. Node Version Compatibility
**Problem**: Angular CLI version conflicts
**Solution**: 
```bash
npm install -g @angular/cli@latest
ng update @angular/core @angular/cli
```

#### 2. Module Not Found Errors
**Problem**: Missing dependencies after cloning
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 3. CORS Issues in Development
**Problem**: API calls blocked by CORS policy
**Solution**: Use the proxy configuration
```bash
npm run dev  # Uses proxy.conf.json
```

#### 4. Build Errors
**Problem**: TypeScript compilation errors
**Solution**: Check TypeScript configuration and update deprecated APIs
```bash
ng update
npm audit fix
```

#### 5. Documentation Generation Fails
**Problem**: TypeDoc errors
**Solution**: 
```bash
npm install typedoc@latest
npm run docs
```

### Performance Optimization

1. **Lazy Loading**: Implement route-based code splitting
2. **Bundle Analysis**: Use webpack-bundle-analyzer
3. **Image Optimization**: Compress images and use appropriate formats
4. **Caching**: Implement service worker for offline support

### Debugging Tips

1. **Chrome DevTools**: Use Angular DevTools extension
2. **Console Logging**: Check browser console for errors
3. **Network Tab**: Monitor API calls and responses
4. **Angular CLI**: Use `ng serve --verbose` for detailed output

## Contributing Guidelines

### Code Style
1. Follow Angular style guide
2. Use meaningful variable and method names
3. Keep components focused and single-purpose
4. Write comprehensive TypeDoc comments
5. Follow consistent indentation (2 spaces)

### Git Workflow
1. Create feature branches from main
2. Use descriptive commit messages
3. Keep commits small and focused
4. Update documentation with changes
5. Test before committing

### Pull Request Process
1. Ensure all tests pass
2. Update documentation if needed
3. Follow the project's code style
4. Provide clear description of changes

---

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular Material Components](https://material.angular.io/components)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeDoc Documentation](https://typedoc.org/)
- [RxJS Documentation](https://rxjs.dev/)

## Support

For questions or issues related to this project:
1. Check this setup manual
2. Review existing GitHub issues
3. Create a new issue with detailed description
4. Include system information and error messages

---

*This setup manual is maintained as part of the myFlix Angular client project documentation. Please keep it updated when making significant changes to the project structure or development workflow.*
