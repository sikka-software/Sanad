export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string
          company: string
          address: string
          city: string
          state: string
          zip_code: string
          notes: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone: string
          company: string
          address: string
          city: string
          state: string
          zip_code: string
          notes?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          company?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          notes?: string | null
          user_id?: string
        }
      }
      invoices: {
        Row: {
          id: string
          created_at: string
          invoice_number: string
          issue_date: string
          due_date: string
          status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          subtotal: number
          tax_rate: number
          tax_amount: number
          total: number
          notes: string | null
          client_id: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          invoice_number: string
          issue_date: string
          due_date: string
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          subtotal: number
          tax_rate?: number
          notes?: string | null
          client_id: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          invoice_number?: string
          issue_date?: string
          due_date?: string
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          subtotal?: number
          tax_rate?: number
          notes?: string | null
          client_id?: string
          user_id?: string
        }
      }
      invoice_items: {
        Row: {
          id: string
          created_at: string
          description: string
          quantity: number
          unit_price: number
          amount: number
          invoice_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          description: string
          quantity?: number
          unit_price: number
          invoice_id: string
        }
        Update: {
          id?: string
          created_at?: string
          description?: string
          quantity?: number
          unit_price?: number
          invoice_id?: string
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 