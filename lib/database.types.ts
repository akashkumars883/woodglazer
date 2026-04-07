export interface Database {
  public: {
    Tables: {
      service_categories: {
        Row: {
          id: string;
          created_at: string;
          slug: string;
          title: string;
          description: string;
          image: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          slug: string;
          title: string;
          description: string;
          image: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          slug?: string;
          title?: string;
          description?: string;
          image?: string;
        };
      };
      sub_services: {
        Row: {
          id: string;
          created_at: string;
          parent_id: string;
          slug: string;
          title: string;
          description: string;
          image: string;
          features: string[] | null;
          details: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          parent_id: string;
          slug: string;
          title: string;
          description: string;
          image: string;
          features?: string[] | null;
          details?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          parent_id?: string;
          slug?: string;
          title?: string;
          description?: string;
          image?: string;
          features?: string[] | null;
          details?: string | null;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          created_at: string;
          slug: string;
          title: string;
          description: string;
          content: string;
          image: string;
          author: string;
          category: string;
          read_time: string;
          featured: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          slug: string;
          title: string;
          description: string;
          content: string;
          image: string;
          author?: string;
          category: string;
          read_time?: string;
          featured?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          slug?: string;
          title?: string;
          description?: string;
          content?: string;
          image?: string;
          author?: string;
          category?: string;
          read_time?: string;
          featured?: boolean;
        };
      };
      site_settings: {
          Row: {
            id: string;
            key: string;
            value: string | number | boolean | Record<string, unknown> | Array<unknown> | null;
          };
          Insert: {
            id?: string;
            key: string;
            value: string | number | boolean | Record<string, unknown> | Array<unknown> | null;
          };
          Update: {
            id?: string;
            key?: string;
            value?: string | number | boolean | Record<string, unknown> | Array<unknown> | null;
          }
      }
    };
  };
}
