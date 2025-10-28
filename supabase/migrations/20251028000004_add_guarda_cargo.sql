-- Adicionar cargo "Guarda" ao ENUM existente
-- Guarda pode criar e editar, mas não pode excluir

-- Adicionar novo valor ao ENUM
ALTER TYPE public.cargo_usuario ADD VALUE IF NOT EXISTS 'guarda';

-- Comentário explicativo
COMMENT ON TYPE public.cargo_usuario IS 'Cargos disponíveis:
- comandante: Acesso total (criar, editar, excluir)
- administrador: Acesso total (criar, editar, excluir)
- desenvolvedor: Acesso total (criar, editar, excluir)
- guarda: Pode criar e editar, mas não excluir
- estagiario: Apenas visualização (read-only)
- visualizador: Apenas visualização (read-only)';
