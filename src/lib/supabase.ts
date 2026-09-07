import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          company: string
          phone: string
          account_type: 'fleet' | 'shop' | 'owner-operator'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          company?: string
          phone?: string
          account_type: 'fleet' | 'shop' | 'owner-operator'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          company?: string
          phone?: string
          account_type?: 'fleet' | 'shop' | 'owner-operator'
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          sku: string
          name: string
          brand: string
          category: string
          part_number: string
          description: string
          specs: JSON
          fits: string
          price: number
          member_price: number
          stock: number
          stock_status: 'in-stock' | 'limited' | 'backorder'
          rating: number
          reviews: number
          members_only: boolean
          tags: string[]
          image: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sku: string
          name: string
          brand: string
          category: string
          part_number: string
          description: string
          specs?: JSON
          fits: string
          price: number
          member_price: number
          stock?: number
          stock_status?: 'in-stock' | 'limited' | 'backorder'
          rating?: number
          reviews?: number
          members_only?: boolean
          tags?: string[]
          image?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sku?: string
          name?: string
          brand?: string
          category?: string
          part_number?: string
          description?: string
          specs?: JSON
          fits?: string
          price?: number
          member_price?: number
          stock?: number
          stock_status?: 'in-stock' | 'limited' | 'backorder'
          rating?: number
          reviews?: number
          members_only?: boolean
          tags?: string[]
          image?: string
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          subtotal: number
          shipping: number
          tax: number
          total: number
          shipping_address: JSON
          billing_address: JSON
          payment_method: JSON
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          subtotal: number
          shipping: number
          tax: number
          total: number
          shipping_address: JSON
          billing_address: JSON
          payment_method: JSON
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          subtotal?: number
          shipping?: number
          tax?: number
          total?: number
          shipping_address?: JSON
          billing_address?: JSON
          payment_method?: JSON
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          product_name: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          product_name: string
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          product_name?: string
          quantity?: number
          price?: number
          created_at?: string
        }
      }
    }
  }
}
