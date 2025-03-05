import { useSupabaseQuery, useSupabaseInsert, useSupabaseUpdate, useSupabaseDelete } from './use-supabase-query'
import type { Database } from '@/lib/database.types'

type Client = Database['public']['Tables']['clients']['Row']
type ClientInsert = Database['public']['Tables']['clients']['Insert']
type ClientUpdate = Database['public']['Tables']['clients']['Update']

export function useClients() {
  const { data: clients, isLoading } = useSupabaseQuery<Client>(
    ['clients'],
    'clients',
    {
      select: '*',
    }
  )

  const insertClient = useSupabaseInsert<ClientInsert>('clients')
  const updateClient = useSupabaseUpdate<ClientUpdate>('clients')
  const deleteClient = useSupabaseDelete('clients')

  return {
    clients,
    isLoading,
    insertClient,
    updateClient,
    deleteClient,
  }
} 