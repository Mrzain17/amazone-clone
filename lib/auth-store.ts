"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import { authService, UserProfile } from "./auth-service"
import { isFirebaseConfigured } from "./firebase-config"

interface AuthStore {
  user: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (name: string, email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  addAddress: (address: Omit<import("./auth-service").Address, "id">) => Promise<void>
  updateAddress: (addressId: string, updates: Partial<import("./auth-service").Address>) => Promise<void>
  updatePreferences: (preferences: Partial<import("./auth-service").UserPreferences>) => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true })
          const userProfile = await authService.signIn(email, password)
          set({
            user: userProfile,
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        } catch (error) {
          set({ isLoading: false })
          console.error("Sign in error:", error)
          throw error
        }
      },

      signUp: async (name: string, email: string, password: string) => {
        try {
          set({ isLoading: true })
          const userProfile = await authService.signUp(name, email, password)
          set({
            user: userProfile,
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        } catch (error) {
          set({ isLoading: false })
          console.error("Sign up error:", error)
          throw error
        }
      },

      signOut: async () => {
        try {
          await authService.signOut()
          set({
            user: null,
            isAuthenticated: false,
          })
        } catch (error) {
          console.error("Sign out error:", error)
          throw error
        }
      },

      updateProfile: async (updates: Partial<UserProfile>) => {
        try {
          await authService.updateProfile(updates)
          const currentUser = get().user
          if (currentUser) {
            set({
              user: { ...currentUser, ...updates },
            })
          }
        } catch (error) {
          console.error("Update profile error:", error)
          throw error
        }
      },

      resetPassword: async (email: string) => {
        try {
          await authService.resetPassword(email)
        } catch (error) {
          console.error("Reset password error:", error)
          throw error
        }
      },

      addAddress: async (address) => {
        try {
          await authService.addAddress(address)
          // Refresh user data to get updated addresses
          const userProfile = await authService.getCurrentUser()
          if (userProfile) {
            set({ user: userProfile })
          }
        } catch (error) {
          console.error("Add address error:", error)
          throw error
        }
      },

      updateAddress: async (addressId, updates) => {
        try {
          await authService.updateAddress(addressId, updates)
          // Refresh user data to get updated addresses
          const userProfile = await authService.getCurrentUser()
          if (userProfile) {
            set({ user: userProfile })
          }
        } catch (error) {
          console.error("Update address error:", error)
          throw error
        }
      },

      updatePreferences: async (preferences) => {
        try {
          await authService.updatePreferences(preferences)
          const currentUser = get().user
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                preferences: { ...currentUser.preferences, ...preferences },
              },
            })
          }
        } catch (error) {
          console.error("Update preferences error:", error)
          throw error
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

// Initialize auth state listener
if (typeof window !== "undefined" && auth && isFirebaseConfigured()) {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // User is signed in
      try {
        const userProfile = await authService.getCurrentUser()
        if (userProfile) {
          useAuthStore.setState({ user: userProfile, isAuthenticated: true, isLoading: false })
        }
      } catch (error) {
        console.error("Error getting user profile:", error)
        useAuthStore.setState({ user: null, isAuthenticated: false, isLoading: false })
      }
    } else {
      // User is signed out
      useAuthStore.setState({ user: null, isAuthenticated: false, isLoading: false })
    }
  })
} else if (typeof window !== "undefined") {
  // Firebase not available, set loading to false
  useAuthStore.setState({ isLoading: false })
}
