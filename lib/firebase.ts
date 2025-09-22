import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { firebaseConfig, isFirebaseConfigured, isUsingEmulators } from './firebase-config'

let app: any = null
let auth: any = null
let db: any = null

// Initialize Firebase only if properly configured
if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)

    // Only connect to emulators if explicitly configured
    if (isUsingEmulators() && typeof window !== 'undefined') {
      try {
        // Check if emulators are already connected
        if (!auth.emulatorConfig) {
          connectAuthEmulator(auth, 'http://localhost:9099')
          console.log('Connected to Firebase Auth emulator')
        }
        if (!db._delegate._databaseId.projectId.includes('demo-')) {
          connectFirestoreEmulator(db, 'localhost', 8080)
          console.log('Connected to Firestore emulator')
        }
      } catch (error) {
        console.log('Firebase emulators not available, using production services')
      }
    }
  } catch (error) {
    console.error('Firebase initialization error:', error)
    console.log('Falling back to mock authentication')
  }
} else {
  console.log('Firebase not configured, using mock authentication')
}

export { auth, db }
export default app
