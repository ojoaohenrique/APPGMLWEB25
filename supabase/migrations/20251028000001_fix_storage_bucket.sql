-- Verificar e criar bucket de storage para fotos dos moradores
-- Este script corrige o erro "Bucket not found"

-- Deletar bucket se já existir (para recriar corretamente)
DELETE FROM storage.buckets WHERE id = 'morador-fotos';

-- Criar bucket público para fotos dos moradores
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'morador-fotos',
  'morador-fotos',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
);

-- Deletar policies antigas se existirem
DROP POLICY IF EXISTS "Fotos são publicamente acessíveis" ON storage.objects;
DROP POLICY IF EXISTS "Usuários autenticados podem fazer upload de fotos" ON storage.objects;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar suas fotos" ON storage.objects;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar suas fotos" ON storage.objects;

-- Criar policies para o bucket de fotos
CREATE POLICY "Fotos são publicamente acessíveis"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'morador-fotos');

CREATE POLICY "Usuários autenticados podem fazer upload de fotos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'morador-fotos');

CREATE POLICY "Usuários autenticados podem atualizar suas fotos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'morador-fotos');

CREATE POLICY "Usuários autenticados podem deletar suas fotos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'morador-fotos');

-- Comentário
COMMENT ON TABLE storage.buckets IS 'Bucket para armazenar fotos dos moradores em situação de rua';
