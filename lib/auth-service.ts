import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  User,
  UserCredential,
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
import { isFirebaseConfigured } from './firebase-config'

// Check if Firebase is available
const isFirebaseAvailable = () => {
  return !!(auth && db && isFirebaseConfigured())
}

export interface UserProfile {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  emailVerified: boolean
  phoneNumber?: string
  addresses?: Address[]
  preferences?: UserPreferences
}

export interface Address {
  id: string
  type: 'shipping' | 'billing'
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface UserPreferences {
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
    marketing: boolean
  }
  language: string
  currency: string
}

class AuthService {
  // Mock user database for fallback
  private mockUsers: Record<string, { password: string; user: UserProfile }> = {
    "demo@example.com": {
      password: "password123",
      user: {
        id: "1",
        email: "demo@example.com",
        name: "Demo User",
        avatar: "/placeholder.svg?height=40&width=40",
        createdAt: "2024-01-01T00:00:00Z",
        emailVerified: true,
        addresses: [],
        preferences: {
          notifications: {
            email: true,
            sms: false,
            push: true,
            marketing: false,
          },
          language: 'en',
          currency: 'USD',
        },
      },
    },
  }

  // Convert Firebase User to our UserProfile interface
  private convertFirebaseUser(user: User): UserProfile {
    return {
      id: user.uid,
      email: user.email || '',
      name: user.displayName || '',
      avatar: user.photoURL || undefined,
      createdAt: user.metadata.creationTime || new Date().toISOString(),
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber || undefined,
    }
  }

  // Sign up with email and password
  async signUp(name: string, email: string, password: string): Promise<UserProfile> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!isFirebaseAvailable()) {
      // Fallback to mock authentication
      if (this.mockUsers[email]) {
        throw new Error("An account with this email already exists")
      }

      const newUser: UserProfile = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date().toISOString(),
        emailVerified: false,
        addresses: [],
        preferences: {
          notifications: {
            email: true,
            sms: false,
            push: true,
            marketing: false,
          },
          language: 'en',
          currency: 'USD',
        },
      }

      this.mockUsers[email] = {
        password,
        user: newUser,
      }

      return newUser
    }

    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Update the user's display name
      await updateProfile(user, {
        displayName: name,
      })

      // Create user document in Firestore
      const userProfile: UserProfile = {
        id: user.uid,
        email: user.email || '',
        name,
        createdAt: new Date().toISOString(),
        emailVerified: user.emailVerified,
        addresses: [],
        preferences: {
          notifications: {
            email: true,
            sms: false,
            push: true,
            marketing: false,
          },
          language: 'en',
          currency: 'USD',
        },
      }

      await setDoc(doc(db, 'users', user.uid), userProfile)

      // Send email verification
      await sendEmailVerification(user)

      return userProfile
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code))
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<UserProfile> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!isFirebaseAvailable()) {
      // Fallback to mock authentication
      const userData = this.mockUsers[email]
      if (userData && userData.password === password) {
        return userData.user
      }
      throw new Error("Invalid email or password")
    }

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Get user profile from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile
      } else {
        // If user document doesn't exist, create it
        const userProfile: UserProfile = this.convertFirebaseUser(user)
        await setDoc(doc(db, 'users', user.uid), userProfile)
        return userProfile
      }
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code))
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    if (!isFirebaseAvailable()) {
      // Mock sign out - just return success
      return
    }

    try {
      await signOut(auth)
    } catch (error: any) {
      throw new Error('Failed to sign out')
    }
  }

  // Update user profile
  async updateProfile(updates: Partial<UserProfile>): Promise<void> {
    if (!isFirebaseAvailable()) {
      // Mock profile update - just return success
      return
    }

    try {
      const user = auth.currentUser
      if (!user) throw new Error('No user signed in')

      // Update Firebase Auth profile
      if (updates.name) {
        await updateProfile(user, {
          displayName: updates.name,
        })
      }

      // Update Firestore document
      await updateDoc(doc(db, 'users', user.uid), {
        ...updates,
        updatedAt: new Date().toISOString(),
      })
    } catch (error: any) {
      throw new Error('Failed to update profile')
    }
  }

  // Send password reset email
  async resetPassword(email: string): Promise<void> {
    if (!isFirebaseAvailable()) {
      // Mock password reset - just return success
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code))
    }
  }

  // Get current user profile
  async getCurrentUser(): Promise<UserProfile | null> {
    if (!isFirebaseAvailable()) {
      // Mock get current user - return null for now
      return null
    }

    try {
      const user = auth.currentUser
      if (!user) return null

      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile
      }

      return this.convertFirebaseUser(user)
    } catch (error) {
      return null
    }
  }

  // Add address
  async addAddress(address: Omit<Address, 'id'>): Promise<void> {
    if (!isFirebaseAvailable()) {
      // Mock add address - just return success
      return
    }

    try {
      const user = auth.currentUser
      if (!user) throw new Error('No user signed in')

      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (!userDoc.exists()) throw new Error('User profile not found')

      const userData = userDoc.data() as UserProfile
      const newAddress: Address = {
        ...address,
        id: Date.now().toString(),
      }

      const updatedAddresses = [...(userData.addresses || []), newAddress]

      await updateDoc(doc(db, 'users', user.uid), {
        addresses: updatedAddresses,
      })
    } catch (error: any) {
      throw new Error('Failed to add address')
    }
  }

  // Update address
  async updateAddress(addressId: string, updates: Partial<Address>): Promise<void> {
    if (!isFirebaseAvailable()) {
      // Mock update address - just return success
      return
    }

    try {
      const user = auth.currentUser
      if (!user) throw new Error('No user signed in')

      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (!userDoc.exists()) throw new Error('User profile not found')

      const userData = userDoc.data() as UserProfile
      const updatedAddresses = (userData.addresses || []).map(addr =>
        addr.id === addressId ? { ...addr, ...updates } : addr
      )

      await updateDoc(doc(db, 'users', user.uid), {
        addresses: updatedAddresses,
      })
    } catch (error: any) {
      throw new Error('Failed to update address')
    }
  }

  // Update preferences
  async updatePreferences(preferences: Partial<UserPreferences>): Promise<void> {
    if (!isFirebaseAvailable()) {
      // Mock update preferences - just return success
      return
    }

    try {
      const user = auth.currentUser
      if (!user) throw new Error('No user signed in')

      await updateDoc(doc(db, 'users', user.uid), {
        'preferences': preferences,
      })
    } catch (error: any) {
      throw new Error('Failed to update preferences')
    }
  }

  // Error message mapping
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address'
      case 'auth/wrong-password':
        return 'Incorrect password'
      case 'auth/email-already-in-use':
        return 'An account with this email already exists'
      case 'auth/weak-password':
        return 'Password should be at least 6 characters'
      case 'auth/invalid-email':
        return 'Invalid email address'
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later'
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection'
      default:
        return 'An error occurred. Please try again'
    }
  }
}

export const authService = new AuthService()
