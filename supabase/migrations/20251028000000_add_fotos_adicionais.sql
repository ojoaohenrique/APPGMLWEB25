-- Criar tabela para fotos adicionais dos moradores
CREATE TABLE public.morador_fotos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  morador_id UUID REFERENCES public.moradores(id) ON DELETE CASCADE NOT NULL,
  foto_url TEXT NOT NULL,
  descricao TEXT,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.morador_fotos ENABLE ROW LEVEL SECURITY;

-- Policies para fotos adicionais
CREATE POLICY "Usuários podem ver fotos de todos os moradores"
  ON public.morador_fotos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem adicionar fotos aos moradores"
  ON public.morador_fotos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.moradores
      WHERE id = morador_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Usuários podem atualizar fotos dos moradores que criaram"
  ON public.morador_fotos FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.moradores
      WHERE id = morador_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Usuários podem deletar fotos dos moradores que criaram"
  ON public.morador_fotos FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.moradores
      WHERE id = morador_id AND user_id = auth.uid()
    )
  );

-- Trigger para atualizar updated_at
CREATE TRIGGER update_morador_fotos_updated_at
  BEFORE UPDATE ON public.morador_fotos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Criar índices para melhor performance
CREATE INDEX idx_morador_fotos_morador_id ON public.morador_fotos(morador_id);
CREATE INDEX idx_morador_fotos_ordem ON public.morador_fotos(morador_id, ordem);

-- Adicionar comentários
COMMENT ON TABLE public.morador_fotos IS 'Fotos adicionais dos moradores em situação de rua';
COMMENT ON COLUMN public.morador_fotos.morador_id IS 'Referência ao morador';
COMMENT ON COLUMN public.morador_fotos.foto_url IS 'URL da foto no storage';
COMMENT ON COLUMN public.morador_fotos.descricao IS 'Descrição opcional da foto';
COMMENT ON COLUMN public.morador_fotos.ordem IS 'Ordem de exibição das fotos';
