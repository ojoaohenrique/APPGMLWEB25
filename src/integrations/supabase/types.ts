export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      moradores: {
        Row: {
          cidade_natal: string | null
          cpf: string | null
          created_at: string | null
          data_nascimento: string | null
          foto_url: string | null
          id: string
          latitude: number | null
          local_abordagem: string
          longitude: number | null
          nome_completo: string
          nome_mae: string | null
          observacoes: string | null
          observacoes_passagens: string | null
          passagens_policia: boolean | null
          possui_vicios: boolean | null
          quais_vicios: string | null
          procurou_assistencia_social: boolean | null
          profissao: string | null
          qual_auxilio: string | null
          qual_servico_procurou: string | null
          recebe_auxilio: boolean | null
          sexo: Database["public"]["Enums"]["sexo_type"] | null
          status_sincronizacao: string | null
          tempo_em_laguna: string | null
          tempo_pretende_ficar: string | null
          tempo_situacao_rua: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cidade_natal?: string | null
          cpf?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          foto_url?: string | null
          id?: string
          latitude?: number | null
          local_abordagem: string
          longitude?: number | null
          nome_completo: string
          nome_mae?: string | null
          observacoes?: string | null
          observacoes_passagens?: string | null
          passagens_policia?: boolean | null
          possui_vicios?: boolean | null
          quais_vicios?: string | null
          procurou_assistencia_social?: boolean | null
          profissao?: string | null
          qual_auxilio?: string | null
          qual_servico_procurou?: string | null
          recebe_auxilio?: boolean | null
          sexo?: Database["public"]["Enums"]["sexo_type"] | null
          status_sincronizacao?: string | null
          tempo_em_laguna?: string | null
          tempo_pretende_ficar?: string | null
          tempo_situacao_rua?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cidade_natal?: string | null
          cpf?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          foto_url?: string | null
          id?: string
          latitude?: number | null
          local_abordagem?: string
          longitude?: number | null
          nome_completo?: string
          nome_mae?: string | null
          observacoes?: string | null
          observacoes_passagens?: string | null
          passagens_policia?: boolean | null
          possui_vicios?: boolean | null
          quais_vicios?: string | null
          procurou_assistencia_social?: boolean | null
          profissao?: string | null
          qual_auxilio?: string | null
          qual_servico_procurou?: string | null
          recebe_auxilio?: boolean | null
          sexo?: Database["public"]["Enums"]["sexo_type"] | null
          status_sincronizacao?: string | null
          tempo_em_laguna?: string | null
          tempo_pretende_ficar?: string | null
          tempo_situacao_rua?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          nome_completo: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          nome_completo: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nome_completo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      sexo_type: "masculino" | "feminino" | "outro"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      sexo_type: ["masculino", "feminino", "outro"],
    },
  },
} as const
