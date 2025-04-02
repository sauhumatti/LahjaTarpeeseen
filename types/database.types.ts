export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          description: string
          price: number
          image_path: string | null
          url: string
          vendor: string
          tags: string[] | string | Record<string, string>
          created_at?: string
          features?: string[]
          domain?: string
          affiliate_url?: string
          embedding?: any
        }
        Insert: {
          id?: number
          name: string
          description: string
          price: number
          image_path?: string | null
          url: string
          vendor: string
          tags?: string[] | string | Record<string, string>
          created_at?: string
          features?: string[]
          domain?: string
          affiliate_url?: string
          embedding?: any
        }
        Update: {
          id?: number
          name?: string
          description?: string
          price?: number
          image_path?: string | null
          url?: string
          vendor?: string
          tags?: string[] | string | Record<string, string>
          created_at?: string
          features?: string[]
          domain?: string
          affiliate_url?: string
          embedding?: any
        }
      }
      managed_gift_tags: {
        Row: {
          id: number
          tag_name: string
          created_at?: string
          image_path: string | null
          active_tag: boolean | null
        }
        Insert: {
          id?: number
          tag_name: string
          created_at?: string
          image_path?: string | null
          active_tag?: boolean | null
        }
        Update: {
          id?: number
          tag_name?: string
          created_at?: string
          image_path?: string | null
          active_tag?: boolean | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      match_products: {
        Args: {
          query_embedding: number[]
          match_count: number
        }
        Returns: {
          id: number
          similarity: number
        }[]
      }
    }
  }
}

export type ManagedGiftTag = Database['public']['Tables']['managed_gift_tags']['Row'];