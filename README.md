# myFlix Angular Client

A single-page, responsive movie application built with Angular, showcasing movie information with user authentication and profile management capabilities. This client-side application connects to the myFlix REST API to provide users with access to movie data, director and genre information, and personal profile management.

## 📋 Project Overview

**myFlix Angular Client** is part of Achievement 6 of the CareerFoundry Full-Stack Web Development program. This project demonstrates proficiency in Angular framework development, Angular Material design implementation, and modern web development practices including comprehensive documentation and code commenting using TypeDoc.

### Key Features

- **User Authentication**: Secure user registration and login system
- **Movie Catalog**: Browse and view detailed information about movies
- **Movie Details**: Access comprehensive information including descriptions, genres, and directors
- **Director Information**: View detailed director biographies and filmographies
- **Genre Exploration**: Discover movies by genre with detailed genre descriptions
- **User Profiles**: Personal profile management with the ability to update user information
- **Favorites Management**: Add and remove movies from personal favorites list
- **Responsive Design**: Fully responsive interface that works on all devices
- **Material Design**: Clean, modern UI built with Angular Material components

## 🚀 Live Demo

- **Live Application**: [myFlix Angular Client](https://souravdas090300.github.io/myFlix-Angular-client/)
- **API Documentation**: Available in the `docs/` folder after running TypeDoc

## 🛠️ Built With

- **Frontend Framework**: Angular (v18+)
- **UI Components**: Angular Material
- **Language**: TypeScript
- **Styling**: SCSS
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **Documentation**: TypeDoc
- **Build Tool**: Angular CLI
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── app/                          # Root app component
│   │   ├── welcome-page/                 # Landing page with login/registration
│   │   ├── user-registration-form/       # User registration modal
│   │   ├── user-login-form/             # User login modal
│   │   ├── movie-card/                  # Main movies display component
│   │   ├── movie-details-dialog/        # Movie details modal
│   │   ├── director-dialog/             # Director information modal
│   │   ├── genre-dialog/               # Genre information modal
│   │   └── user-profile/               # User profile management
│   ├── services/
│   │   └── fetch-api-data.service.ts   # API communication service
│   ├── app-routing.module.ts           # Application routing
│   └── app.module.ts                   # Main app module
├── assets/                             # Static assets
├── environments/                       # Environment configurations
└── styles.scss                        # Global styles
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (`npm install -g @angular/cli`)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/souravdas090300/myFlix-Angular-client.git
   cd myFlix-Angular-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```
   
4. **Open your browser**
   Navigate to `http://localhost:4200/`

### Development Scripts

```bash
# Start development server
npm run start

# Start with proxy configuration
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Run unit tests
npm run test

# Generate documentation
npm run docs

# Serve documentation locally
npm run docs:serve
```

## 🎯 User Stories

As a user, I want to:
- Register for a new account and log in securely
- Browse a comprehensive list of movies
- View detailed information about movies, including descriptions and images
- Learn about movie directors and their backgrounds
- Explore different movie genres and their characteristics
- Manage my personal profile and account information
- Maintain a list of favorite movies
- Access the application from any device with responsive design

## 🔧 Technical Requirements Met

- ✅ Built with Angular (v18+)
- ✅ Latest Node.js and npm versions
- ✅ User registration and login forms
- ✅ Angular Material design implementation
- ✅ Comprehensive TypeDoc code documentation
- ✅ Technical documentation using JSDoc principles
- ✅ Hosted on GitHub Pages
- ✅ Responsive design for all screen sizes
- ✅ HTTP interceptors for authentication
- ✅ Error handling and user feedback
- ✅ Route guards for protected pages

## 📚 API Integration

This application connects to the myFlix REST API which provides:
- User registration and authentication endpoints
- Movie data retrieval and search capabilities
- User profile management
- Favorites list management
- Director and genre information

**API Base URL**: `https://movie-flix-fb6c35ebba0a.herokuapp.com/`

## 🤖 AI Assistance Declaration

In accordance with best practices for transparent development, this project's documentation and some code comments were developed with assistance from AI tools to ensure comprehensive coverage and consistent formatting. All AI-generated content has been reviewed, validated, and customized to accurately reflect the project's functionality and requirements.

## 🎨 Design & UX

The application features:
- **Clean Material Design**: Following Google's Material Design principles
- **Intuitive Navigation**: Easy-to-use interface with clear call-to-action buttons
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Loading States**: Visual feedback during data fetching operations
- **Error Handling**: User-friendly error messages and graceful fallbacks

## 📖 Documentation

Comprehensive documentation is available:

- **TypeDoc Documentation**: Run `npm run docs` to generate and `npm run docs:serve` to view
- **Code Comments**: All components, services, and methods are thoroughly documented
- **API Documentation**: Available in the generated TypeDoc output
- **Setup Guide**: This README provides complete setup instructions

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
ng test --code-coverage

# Run e2e tests (if configured)
ng e2e
```

## 🚀 Deployment

The application is configured for deployment on GitHub Pages:

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

The deployment process:
1. Builds the application for production
2. Optimizes assets and bundles
3. Deploys to GitHub Pages branch
4. Makes the application available at the live URL

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## 📄 License

This project is part of the CareerFoundry Full-Stack Web Development program and is created for educational purposes.

## 👨‍💻 Developer

**Sourav Das**
- GitHub: [@souravdas090300](https://github.com/souravdas090300)
- Project Repository: [myFlix-Angular-client](https://github.com/souravdas090300/myFlix-Angular-client)

## 🔗 Related Projects

- **myFlix API**: Backend REST API for this application
- **myFlix React Client**: React version of this application

---

*This project demonstrates proficiency in Angular development, TypeScript programming, Angular Material implementation, responsive design, and comprehensive documentation practices essential for professional web development.*
