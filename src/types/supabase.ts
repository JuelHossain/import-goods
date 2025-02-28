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
      users: {
        Row: {
          id: string
          created_at: string
          full_name: string | null
          phone: string | null
          shipping_address: string | null
          is_admin: boolean
        }
        Insert: {
          id: string
          created_at?: string
          full_name?: string | null
          phone?: string | null
          shipping_address?: string | null
          is_admin?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          full_name?: string | null
          phone?: string | null
          shipping_address?: string | null
          is_admin?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string
          price: number
          merchant_id: string
          images: string[]
          category: string
          in_stock: boolean
          featured: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description: string
          price: number
          merchant_id: string
          images: string[]
          category: string
          in_stock?: boolean
          featured?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string
          price?: number
          merchant_id?: string
          images?: string[]
          category?: string
          in_stock?: boolean
          featured?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "products_merchant_id_fkey"
            columns: ["merchant_id"]
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          }
        ]
      }
      merchants: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          country: string
          logo: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          country: string
          logo?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          country?: string
          logo?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          status: string
          total_amount: number
          shipping_address: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          status?: string
          total_amount: number
          shipping_address: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          status?: string
          total_amount?: number
          shipping_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      order_items: {
        Row: {
          id: string
          created_at: string
          order_id: string
          product_id: string
          quantity: number
          price: number
        }
        Insert: {
          id?: string
          created_at?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
        }
        Update: {
          id?: string
          created_at?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      pre_orders: {
        Row: {
          id: string
          created_at: string
          user_id: string
          product_link: string
          product_images: string[] | null
          status: string
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          product_link: string
          product_images?: string[] | null
          status?: string
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          product_link?: string
          product_images?: string[] | null
          status?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pre_orders_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
