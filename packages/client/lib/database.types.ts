export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      Comment: {
        Row: {
          createdAt: string
          id: string
          profileId: string
          projectId: string
          text: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          profileId: string
          projectId: string
          text: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: string
          profileId?: string
          projectId?: string
          text?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Comment_profileId_fkey"
            columns: ["profileId"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Comment_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "Project"
            referencedColumns: ["id"]
          }
        ]
      }
      Layer: {
        Row: {
          blendingMode: Database["public"]["Enums"]["BlendingMode"]
          circuit: Json | null
          createdAt: string
          enabled: boolean
          fragment: string | null
          id: string
          name: string
          projectId: string
          type: Database["public"]["Enums"]["LayerType"]
          updatedAt: string
        }
        Insert: {
          blendingMode?: Database["public"]["Enums"]["BlendingMode"]
          circuit?: Json | null
          createdAt?: string
          enabled?: boolean
          fragment?: string | null
          id: string
          name: string
          projectId: string
          type: Database["public"]["Enums"]["LayerType"]
          updatedAt?: string
        }
        Update: {
          blendingMode?: Database["public"]["Enums"]["BlendingMode"]
          circuit?: Json | null
          createdAt?: string
          enabled?: boolean
          fragment?: string | null
          id?: string
          name?: string
          projectId?: string
          type?: Database["public"]["Enums"]["LayerType"]
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Layer_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "Project"
            referencedColumns: ["id"]
          }
        ]
      }
      Like: {
        Row: {
          createdAt: string
          id: string
          profileId: string
          projectId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          profileId: string
          projectId: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: string
          profileId?: string
          projectId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Like_profileId_fkey"
            columns: ["profileId"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Like_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "Project"
            referencedColumns: ["id"]
          }
        ]
      }
      Profile: {
        Row: {
          bio: string | null
          createdAt: string
          id: string
          image: string | null
          location: string | null
          updatedAt: string
          username: string
          website: string | null
        }
        Insert: {
          bio?: string | null
          createdAt?: string
          id: string
          image?: string | null
          location?: string | null
          updatedAt?: string
          username: string
          website?: string | null
        }
        Update: {
          bio?: string | null
          createdAt?: string
          id?: string
          image?: string | null
          location?: string | null
          updatedAt?: string
          username?: string
          website?: string | null
        }
        Relationships: []
      }
      Project: {
        Row: {
          createdAt: string
          description: string | null
          id: string
          layerOrder: string[] | null
          name: string
          originId: string | null
          profileId: string
          updatedAt: string
          visibility: Database["public"]["Enums"]["ProjectVisibility"]
        }
        Insert: {
          createdAt?: string
          description?: string | null
          id: string
          layerOrder?: string[] | null
          name: string
          originId?: string | null
          profileId: string
          updatedAt?: string
          visibility?: Database["public"]["Enums"]["ProjectVisibility"]
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: string
          layerOrder?: string[] | null
          name?: string
          originId?: string | null
          profileId?: string
          updatedAt?: string
          visibility?: Database["public"]["Enums"]["ProjectVisibility"]
        }
        Relationships: [
          {
            foreignKeyName: "Project_originId_fkey"
            columns: ["originId"]
            referencedRelation: "Project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Project_profileId_fkey"
            columns: ["profileId"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          }
        ]
      }
      Relationship: {
        Row: {
          createdAt: string
          id: string
          profileId: string
          targetProfileId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          profileId: string
          targetProfileId: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: string
          profileId?: string
          targetProfileId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Relationship_profileId_fkey"
            columns: ["profileId"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Relationship_targetProfileId_fkey"
            columns: ["targetProfileId"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          }
        ]
      }
      Subscription: {
        Row: {
          createdAt: string
          id: string
          profileId: string
          stripeCustomerId: string
          stripeSubscriptionId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          profileId: string
          stripeCustomerId: string
          stripeSubscriptionId: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: string
          profileId?: string
          stripeCustomerId?: string
          stripeSubscriptionId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Subscription_profileId_fkey"
            columns: ["profileId"]
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          }
        ]
      }
      Uniform: {
        Row: {
          createdAt: string
          id: string
          name: string
          projectId: string
          type: Database["public"]["Enums"]["UniformType"]
          updatedAt: string
          value: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          projectId: string
          type: Database["public"]["Enums"]["UniformType"]
          updatedAt?: string
          value: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          projectId?: string
          type?: Database["public"]["Enums"]["UniformType"]
          updatedAt?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "Uniform_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "Project"
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
      BlendingMode:
        | "NONE"
        | "NORMAL"
        | "ADD"
        | "SCREEN"
        | "MULTIPLY"
        | "OVERLAY"
      LayerType: "FRAGMENT" | "CIRCUIT"
      ProjectVisibility: "PUBLIC" | "PRIVATE"
      UniformType: "TEXTURE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

