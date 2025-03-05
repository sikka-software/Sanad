import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

// Example query hook for fetching data
export function useSupabaseQuery<T>(
  key: string[],
  table: string,
  options: { select?: string; filter?: any } = {}
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      let query = supabase.from(table).select(options.select || '*')
      
      if (options.filter) {
        query = query.match(options.filter)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      return data as T[]
    },
  })
}

// Example mutation hook for inserting data
export function useSupabaseInsert<T>(table: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (newData: Partial<T>) => {
      const { data, error } = await supabase
        .from(table)
        .insert(newData)
        .select()
      
      if (error) throw error
      return data[0] as T
    },
    onSuccess: () => {
      // Invalidate queries related to this table
      queryClient.invalidateQueries({ queryKey: [table] })
    },
  })
}

// Example mutation hook for updating data
export function useSupabaseUpdate<T>(table: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number | string; data: Partial<T> }) => {
      const { data: updatedData, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return updatedData[0] as T
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] })
    },
  })
}

// Example mutation hook for deleting data
export function useSupabaseDelete(table: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: number | string) => {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] })
    },
  })
} 