"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (name: string, email: string, password: string) => Promise<boolean>
  signOut: () => void
  updateProfile: (updates: Partial<User>) => void
}

// Mock user database
const mockUsers: Record<string, { password: string; user: User }> = {
  "demo@example.com": {
    password: "password123",
    user: {
      id: "1",
      email: "demo@example.com",
      name: "Demo User",
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: "2024-01-01T00:00:00Z",
    },
  },
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      signIn: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const userData = mockUsers[email]
        if (userData && userData.password === password) {
          set({
            user: userData.user,
            isAuthenticated: true,
          })
          return true
        }
        return false
      },

      signUp: async (name: string, email: string, password: string) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Check if user already exists
        if (mockUsers[email]) {
          return false
        }

        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          createdAt: new Date().toISOString(),
        }

        mockUsers[email] = {
          password,
          user: newUser,
        }

        set({
          user: newUser,
          isAuthenticated: true,
        })
        return true
      },

      signOut: () => {
        set({
          user: null,
          isAuthenticated: false,
        })
      },

      updateProfile: (updates: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updates }
          set({ user: updatedUser })

          // Update in mock database
          const userData = mockUsers[currentUser.email]
          if (userData) {
            userData.user = updatedUser
          }
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
