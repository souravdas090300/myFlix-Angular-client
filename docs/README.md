# myFlix Angular Client Documentation

## Overview

This documentation provides comprehensive information about the myFlix Angular client application components, services, and architecture.

## Getting Started

1. Open `index.html` in your browser to view the full documentation
2. Navigate through the modules to explore different components
3. Click on classes to see detailed method and property documentation

## Key Components

### Core Services
- **FetchApiDataService**: Main service for API communication with the myFlix backend
- **AuthGuard**: Route protection for authenticated users

### Main Components
- **AppComponent**: Root application component
- **WelcomePageComponent**: Landing page with login/registration options
- **MovieCardComponent**: Displays movies in a grid layout with interaction features
- **UserLoginFormComponent**: User authentication form
- **UserRegistrationFormComponent**: New user registration form
- **UserProfileComponent**: User profile management

### Dialog Components
- **DirectorDialogComponent**: Displays director information
- **GenreDialogComponent**: Shows genre details
- **MovieDetailsDialogComponent**: Full movie information modal

## Architecture

The application follows Angular best practices with:
- Modular component structure
- Service-based API communication
- Material Design UI components
- TypeScript for type safety
- Responsive design patterns

## API Integration

All API calls are handled through the `FetchApiDataService` which provides methods for:
- User registration and authentication
- Movie data retrieval
- User profile management
- Favorite movies handling

## Navigation

The application uses Angular Router for navigation between:
- Welcome page (unauthenticated users)
- Movies page (authenticated users)
- User profile page

## Development

Generated with TypeDoc for comprehensive code documentation.
Last updated: ${new Date().toISOString().split('T')[0]}
