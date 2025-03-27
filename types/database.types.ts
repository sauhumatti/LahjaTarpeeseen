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
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}