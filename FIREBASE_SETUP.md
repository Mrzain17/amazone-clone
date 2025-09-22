# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for your Amazon Clone project.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "amazon-clone")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

## Step 3: Get Firebase Configuration

1. In your Firebase project, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click "Add app" and select the web icon (</>)
5. Register your app with a nickname (e.g., "amazon-clone-web")
6. Copy the Firebase configuration object

## Step 4: Set Up Environment Variables

1. Create a `.env.local` file in your project root
2. Add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the values with your actual Firebase configuration.

## Step 5: Set Up Firestore Database

1. In your Firebase project, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database
5. Click "Done"

## Step 6: Configure Firestore Security Rules

1. Go to the "Rules" tab in Firestore Database
2. Update the rules to allow authenticated users to read/write their own data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow read access to public data (products, categories, etc.)
    match /products/{document} {
      allow read: if true;
    }
    
    match /categories/{document} {
      allow read: if true;
    }
  }
}
```

## Step 7: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/auth/signup` and create a test account
3. Check the Firebase Console to see if the user was created
4. Try signing in with the test account

## Optional: Set Up Firebase Emulators (Development)

For local development, you can use Firebase emulators:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase in your project:
   ```bash
   firebase init
   ```

3. Select "Authentication" and "Firestore" emulators
4. Start the emulators:
   ```bash
   firebase emulators:start
   ```

The emulators will run on:
- Authentication: http://localhost:9099
- Firestore: http://localhost:8080

## Features Included

✅ **Email/Password Authentication**
- User registration
- User login
- Password reset
- Email verification

✅ **User Profile Management**
- Profile information
- Address management
- Notification preferences
- Account settings

✅ **Real-time Authentication State**
- Automatic login persistence
- Session management
- Secure logout

✅ **Error Handling**
- User-friendly error messages
- Network error handling
- Validation feedback

## Security Features

- **Firebase Security Rules** for data protection
- **Email verification** for account security
- **Password strength requirements**
- **Secure session management**
- **CSRF protection** built into Firebase

## Next Steps

1. **Customize the UI** to match your brand
2. **Add social authentication** (Google, Facebook, etc.)
3. **Implement role-based access** for admin users
4. **Add two-factor authentication** for enhanced security
5. **Set up email templates** for better user experience

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/configuration-not-found)"**
   - Check that your environment variables are correctly set
   - Ensure the Firebase project is properly configured

2. **"Firebase: Error (auth/invalid-api-key)"**
   - Verify your API key in the environment variables
   - Check that the API key is from the correct Firebase project

3. **"Firebase: Error (auth/too-many-requests)"**
   - This is a rate limiting error
   - Wait a few minutes before trying again

4. **Firestore permission denied**
   - Check your Firestore security rules
   - Ensure the user is properly authenticated

### Getting Help:

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
