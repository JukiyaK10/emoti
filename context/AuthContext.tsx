'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

const AuthContext = createContext<{
  user: User | null
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signInWithGithub: () => Promise<{ error?: string }>
  signOut: () => Promise<void>
}>({
  user: null,
  signIn: async () => ({}),
  signInWithGithub: async () => ({}),
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // 現在のセッション状態を確認
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) return { error: error.message }
      if (!data.user) return { error: 'ユーザーが見つかりません' }
      return {}
    } catch (err) {
      return { error: 'ログインに失敗しました' }
    }
  }

  const signInWithGithub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
      })
      if (error) return { error: error.message }
      return {}
    } catch (err) {
      return { error: 'GitHubログインに失敗しました' }
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signInWithGithub, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)