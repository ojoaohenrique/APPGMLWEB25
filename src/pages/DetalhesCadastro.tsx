import { AppLayout } from "@/components/layout/AppLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, User, Calendar, MapPin, Phone, Briefcase, 
  Home, Clock, HandHelping, AlertCircle, Edit, Image as ImageIcon,
  MapPinned, FileText
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { CriadorInfo } from "@/components/CriadorInfo";

const DetalhesCadastro = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Buscar dados do morador
  const { data: morador, isLoading } = useQuery({
    queryKey: ['morador', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('moradores')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Buscar fotos adicionais
  const { data: fotosAdicionais = [] } = useQuery({
    queryKey: ['morador-fotos', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('morador_fotos')
        .select('*')
        .eq('morador_id', id)
        .order('ordem', { ascending: true });
      
      if (error) throw error;
      
      // Gerar URLs públicas para as fotos
      const fotosComUrl = data.map(foto => {
        // Se a URL já for completa, usar ela
        if (foto.foto_url && (foto.foto_url.startsWith('http://') || foto.foto_url.startsWith('https://'))) {
          return {
            ...foto,
            url: foto.foto_url
          };
        }
        
        // Caso contrário, gerar URL pública do Supabase
        const { data: { publicUrl } } = supabase.storage
          .from('morador-fotos')
          .getPublicUrl(foto.foto_url || '');
        
        return {
          ...foto,
          url: publicUrl
        };
      });
      
      return fotosComUrl;
    },
    enabled: !!id,
  });

  const getInitials = (nome: string) => {
    return nome
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </AppLayout>
    );
  }

  if (!morador) {
    return (
      <AppLayout>
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Cadastro não encontrado</h3>
              <Button onClick={() => navigate('/cadastrados')} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Cadastrados
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/cadastrados')}
              className="mb-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold">Detalhes do Cadastro</h1>
            <p className="text-muted-foreground">
              Cadastrado em {format(new Date(morador.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
            </p>
            {morador.criado_por_nome && (
              <CriadorInfo 
                criadorNome={morador.criado_por_nome}
                dataCriacao={format(new Date(morador.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                className="mt-2"
              />
            )}
          </div>
          <Button onClick={() => navigate(`/editar-cadastro/${id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar Cadastro
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Esquerda - Foto e Info Básica */}
          <div className="lg:col-span-1 space-y-6">
            {/* Foto Principal */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-48 w-48 border-4 border-primary/20">
                    <AvatarImage src={morador.foto_url || undefined} className="object-cover" />
                    <AvatarFallback className="text-5xl bg-primary/10 text-primary">
                      {getInitials(morador.nome_completo)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold mt-4 text-center">{morador.nome_completo}</h2>
                  {morador.cpf && (
                    <p className="text-muted-foreground mt-1">CPF: {morador.cpf}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Status e Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {morador.recebe_auxilio && (
                  <Badge variant="secondary" className="w-full justify-start">
                    <HandHelping className="h-4 w-4 mr-2" />
                    Recebe Auxílio{morador.qual_auxilio && `: ${morador.qual_auxilio}`}
                  </Badge>
                )}
                {morador.possui_vicios && (
                  <Badge variant="outline" className="w-full justify-start">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Possui Vícios{morador.quais_vicios && `: ${morador.quais_vicios}`}
                  </Badge>
                )}
                {morador.passagens_policia && (
                  <Badge variant="destructive" className="w-full justify-start">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Passagens Policiais
                  </Badge>
                )}
                {morador.procurou_assistencia_social && (
                  <Badge variant="secondary" className="w-full justify-start">
                    <HandHelping className="h-4 w-4 mr-2" />
                    Procurou Assistência Social
                    {morador.qual_servico_procurou && `: ${morador.qual_servico_procurou}`}
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita - Informações Detalhadas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informações Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {morador.data_nascimento && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Data de Nascimento</p>
                    <p className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {format(new Date(morador.data_nascimento), "dd/MM/yyyy", { locale: ptBR })}
                    </p>
                  </div>
                )}
                {morador.sexo && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Sexo</p>
                    <p className="font-medium capitalize">{morador.sexo}</p>
                  </div>
                )}
                {morador.nome_mae && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground mb-1">Nome da Mãe</p>
                    <p className="font-medium">{morador.nome_mae}</p>
                  </div>
                )}
                {morador.cidade_natal && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cidade Natal</p>
                    <p className="font-medium flex items-center gap-2">
                      <Home className="h-4 w-4 text-primary" />
                      {morador.cidade_natal}
                    </p>
                  </div>
                )}
                {morador.profissao && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Profissão</p>
                    <p className="font-medium flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      {morador.profissao}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Localização da Abordagem */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPinned className="h-5 w-5" />
                  Localização da Abordagem
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Local da Abordagem</p>
                  <p className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {morador.local_abordagem}
                  </p>
                </div>
                {morador.bairro && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Bairro</p>
                    <p className="font-medium">{morador.bairro}</p>
                  </div>
                )}
                {morador.rua && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Rua/Avenida</p>
                    <p className="font-medium">{morador.rua}</p>
                  </div>
                )}
                {morador.informacoes_local && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Informações do Local</p>
                    <p className="font-medium text-sm leading-relaxed">{morador.informacoes_local}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Situação Social */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Situação Social
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {morador.tempo_situacao_rua && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tempo em Situação de Rua</p>
                    <p className="font-medium">{morador.tempo_situacao_rua}</p>
                  </div>
                )}
                {morador.tempo_em_laguna && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tempo em Laguna</p>
                    <p className="font-medium">{morador.tempo_em_laguna}</p>
                  </div>
                )}
                {morador.tempo_pretende_ficar && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tempo que Pretende Ficar</p>
                    <p className="font-medium">{morador.tempo_pretende_ficar}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Observações */}
            {(morador.observacoes || morador.observacoes_passagens) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Observações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {morador.observacoes && (
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-4">
                      <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-2">Observações Gerais</p>
                      <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">{morador.observacoes}</p>
                    </div>
                  )}
                  {morador.observacoes_passagens && (
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-4">
                      <p className="text-sm font-semibold text-red-900 dark:text-red-200 mb-2">Observações sobre Passagens Policiais</p>
                      <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">{morador.observacoes_passagens}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Fotos Adicionais */}
            {fotosAdicionais.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Fotos Adicionais ({fotosAdicionais.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {fotosAdicionais.map((foto) => (
                      <div key={foto.id} className="relative group">
                        <img
                          src={foto.url}
                          alt={foto.descricao || 'Foto adicional'}
                          className="w-full h-32 object-cover rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer"
                          onClick={() => window.open(foto.url, '_blank')}
                        />
                        {foto.descricao && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">{foto.descricao}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DetalhesCadastro;
