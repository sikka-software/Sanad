import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

export function useAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: session, isLoading: isLoadingSession } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return session
    },
  })

  const signIn = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] })
      router.push('/dashboard')
      toast.success('Signed in successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const signUp = useMutation({
    mutationFn: async ({ email, password, name }: { email: string; password: string; name: string }) => {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })
      if (authError) throw authError

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email,
            name,
          })
        if (profileError) throw profileError
      }

      return authData
    },
    onSuccess: () => {
      toast.success('Check your email to confirm your account')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const signOut = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.clear()
      router.push('/login')
      toast.success('Signed out successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    session,
    isLoadingSession,
    signIn,
    signUp,
    signOut,
  }
} 