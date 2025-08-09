# TaskMaster React Application

## Overview
TaskMaster is a React-based task management application with Firebase authentication integration. This application allows users to manage their tasks, projects, and schedules with a modern and responsive UI.

## Features
- User authentication (Email/Password and Google Sign-in)
- Task management
- Project overview
- Calendar integration
- Settings management

## Firebase Authentication
This project uses Firebase for authentication. The following authentication methods are supported:
- Email/Password login and registration
- Google Sign-in
- Password reset functionality

For detailed setup instructions, please refer to the [Firebase Setup Guide](./FIREBASE_SETUP.md).

## Project Structure
- `/src/components` - React components
- `/src/context` - Context providers including AuthContext
- `/src/firebase` - Firebase configuration and authentication services
- `/src/styles` - CSS stylesheets
- `/src/utils` - Utility functions including error handling

## Getting Started

### Prerequisites
- Node.js and npm
- Firebase project (see Firebase Setup Guide)

### Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure Firebase:
   - Follow the instructions in the [Firebase Setup Guide](./FIREBASE_SETUP.md)
   - Ensure your `.env.local` file is properly configured with your Firebase credentials

### Running the Application
```
npm start
```

### Building for Production
```
npm run build
```

## Error Handling
The application includes a custom error handling system that displays alerts for various operations. The alerts are positioned at the top of the viewport and include different styles for success, error, warning, and info messages.

## Firebase Project Information
This project is configured with the following Firebase details:
- Project ID: `taskmaster-3beb4`
- Project Number: `779441961434`
- All Firebase configuration values have been set up in the `.env.local` file