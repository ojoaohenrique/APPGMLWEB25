import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, User, Calendar, Phone, Edit, Trash2, AlertCircle, RefreshCw, Loader2, Users, CalendarClock, HandHelping } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Morador } from "@/types/morador";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

const Cadastrados = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [busca, setBusca] = useState("");

  const { data: moradores = [], isLoading, error, refetch } = useQuery({
    queryKey: ['moradores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('moradores')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Erro ao buscar moradores:', error);
        throw error;
      }
      return data as Morador[];
    },
    retry: 2,
  });

  // Query para cadastros do mês atual
  const { data: statsMes, isLoading: isLoadingMes } = useQuery({
    queryKey: ['stats-mes'],
    queryFn: async () => {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();

      const { error, count } = await supabase
        .from('moradores')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', firstDayOfMonth);

      if (error) throw error;
      return count ?? 0;
    },
  });

  // Filtrar moradores
  const moradoresFiltrados = moradores.filter((m) => {
    if (!busca) return true;
    const termoBusca = busca.toLowerCase();
    const nomeCompleto = m.nome_completo?.toLowerCase() ?? "";
    const cpf = m.cpf?.toLowerCase() ?? "";
    const localAbordagem = m.local_abordagem?.toLowerCase() ?? "";

    return nomeCompleto.includes(termoBusca) ||
      cpf.includes(termoBusca) ||
      localAbordagem.includes(termoBusca);
  });

  const getInitials = (nome: string) => {
    return nome
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDelete = async (morador: Morador) => {
    try {
      // Deletar foto se existir
      if (morador.foto_url) {
        const fileName = morador.foto_url.split('/').pop();
        if (fileName) {
          await supabase.storage.from('morador-fotos').remove([fileName]);
        }
      }

      // Deletar registro
      const { error } = await supabase
        .from('moradores')
        .delete()
        .eq('id', morador.id);

      if (error) throw error;

      toast({
        title: "Cadastro excluído",
        description: "O registro foi removido com sucesso",
      });

      refetch();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const totalCadastros = moradores.length;
  const comAuxilio = moradores.filter(m => m.recebe_auxilio).length;
  const locaisUnicos = new Set(moradores.map(m => m.local_abordagem)).size;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cadastrados</h1>
            <p className="text-muted-foreground">
              {moradoresFiltrados.length} {moradoresFiltrados.length === 1 ? 'morador cadastrado' : 'moradores cadastrados'}
            </p>
          </div>
          <Button onClick={() => navigate("/novo-cadastro")} className="bg-primary">
            <User className="mr-2 h-4 w-4" />
            Novo Cadastro
          </Button>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Cadastros</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCadastros}</div>
              <p className="text-xs text-muted-foreground">moradores cadastrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cadastros Este Mês</CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingMes ? '...' : (statsMes ?? 0)}
              </div>
              <p className="text-xs text-muted-foreground">novos registros no mês atual</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recebem Auxílio</CardTitle>
              <HandHelping className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{comAuxilio}</div>
              <p className="text-xs text-muted-foreground">com auxílio do governo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Locais Diferentes</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{locaisUnicos}</div>
              <p className="text-xs text-muted-foreground">pontos de abordagem</p>
            </CardContent>
          </Card>
        </div>

        {/* Busca */}
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, CPF ou local..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
          </CardContent>
        </Card>

        {/* Lista de Moradores */}
        {error ? (
          <Card className="bg-card">
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Erro ao carregar cadastros</h3>
              <p className="text-muted-foreground mb-4">
                {error instanceof Error ? error.message : 'Erro desconhecido'}
              </p>
              <Button onClick={() => refetch()} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Tentar Novamente
              </Button>
            </CardContent>
          </Card>
        ) : isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : moradoresFiltrados.length === 0 ? (
          <Card className="bg-card">
            <CardContent className="py-12 text-center">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {moradores.length === 0 
                  ? "Nenhum morador cadastrado ainda" 
                  : "Nenhum morador encontrado com este termo de busca"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {moradoresFiltrados.map((morador) => (
              <Card key={morador.id} className="bg-card hover:bg-secondary/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={morador.foto_url || undefined} />
                        <AvatarFallback className="text-lg bg-primary/10 text-primary">
                          {getInitials(morador.nome_completo)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 text-foreground">{morador.nome_completo}</CardTitle>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {morador.cpf && (
                            <p className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              CPF: {morador.cpf}
                            </p>
                          )}
                          <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {morador.local_abordagem}
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Cadastrado em {format(new Date(morador.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(`/editar-cadastro/${morador.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o cadastro de {morador.nome_completo}? 
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(morador)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    {morador.data_nascimento && (
                      <div>
                        <p className="text-muted-foreground">Data de Nascimento</p>
                        <p className="font-medium text-foreground">
                          {format(new Date(morador.data_nascimento), "dd/MM/yyyy", { locale: ptBR })}
                        </p>
                      </div>
                    )}
                    {morador.sexo && (
                      <div>
                        <p className="text-muted-foreground">Sexo</p>
                        <p className="font-medium text-foreground capitalize">{morador.sexo}</p>
                      </div>
                    )}
                    {morador.nome_mae && (
                      <div>
                        <p className="text-muted-foreground">Nome da Mãe</p>
                        <p className="font-medium text-foreground">{morador.nome_mae}</p>
                      </div>
                    )}
                    {morador.cidade_natal && (
                      <div>
                        <p className="text-muted-foreground">Cidade Natal</p>
                        <p className="font-medium text-foreground">{morador.cidade_natal}</p>
                      </div>
                    )}
                    {morador.profissao && (
                      <div>
                        <p className="text-muted-foreground">Profissão</p>
                        <p className="font-medium text-foreground">{morador.profissao}</p>
                      </div>
                    )}
                    {morador.tempo_situacao_rua && (
                      <div>
                        <p className="text-muted-foreground">Tempo em Situação de Rua</p>
                        <p className="font-medium text-foreground">{morador.tempo_situacao_rua}</p>
                      </div>
                    )}
                    {morador.tempo_em_laguna && (
                      <div>
                        <p className="text-muted-foreground">Tempo em Laguna</p>
                        <p className="font-medium text-foreground">{morador.tempo_em_laguna}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {morador.recebe_auxilio && (
                      <Badge variant="secondary">
                        Recebe Auxílio{morador.qual_auxilio ? `: ${morador.qual_auxilio}` : ''}
                      </Badge>
                    )}
                    {morador.possui_vicios && (
                      <Badge variant="outline">Possui Vícios</Badge>
                    )}
                    {morador.passagens_policia && (
                      <Badge variant="destructive">Passagens Policiais</Badge>
                    )}
                    {morador.procurou_assistencia_social && (
                      <Badge variant="secondary">Procurou Assistência Social</Badge>
                    )}
                  </div>
                  {morador.observacoes && (
                    <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Observações</p>
                      <p className="text-sm text-foreground">{morador.observacoes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Cadastrados;
