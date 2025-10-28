import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, User, Calendar, Phone, Edit, Trash2, AlertCircle, RefreshCw, Loader2, Users, CalendarClock, HandHelping, Eye } from "lucide-react";
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {moradoresFiltrados.map((morador) => (
              <Card key={morador.id} className="bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Header com foto e ações */}
                  <div className="relative bg-gradient-to-br from-primary/5 via-primary/3 to-transparent p-6 pb-20">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="secondary" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(new Date(morador.created_at), "dd/MM/yyyy", { locale: ptBR })}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => navigate(`/cadastrado/${morador.id}`)}
                          className="h-8 w-8 p-0"
                          title="Ver Detalhes"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/editar-cadastro/${morador.id}`)}
                          className="h-8 w-8 p-0"
                          title="Editar"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="h-8 w-8 p-0" title="Excluir">
                              <Trash2 className="h-3.5 w-3.5" />
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
                    
                    {/* Foto centralizada e proeminente */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                          <AvatarImage src={morador.foto_url || undefined} className="object-cover" />
                          <AvatarFallback className="text-3xl bg-primary/10 text-primary font-semibold">
                            {getInitials(morador.nome_completo)}
                          </AvatarFallback>
                        </Avatar>
                        {morador.foto_url && (
                          <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 border-2 border-background">
                            <User className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Nome e informações principais */}
                  <div className="px-6 -mt-12 relative z-10">
                    <div className="bg-background rounded-lg shadow-md p-4 border">
                      <h3 className="text-xl font-bold text-center text-foreground mb-3">
                        {morador.nome_completo}
                      </h3>
                      
                      {/* Informações essenciais com ícones */}
                      <div className="space-y-2.5">
                        {morador.cpf && (
                          <div className="flex items-center gap-3 text-sm bg-secondary/30 rounded-md px-3 py-2">
                            <div className="bg-primary/10 p-1.5 rounded">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-muted-foreground font-medium">CPF</p>
                              <p className="font-semibold text-foreground">{morador.cpf}</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-3 text-sm bg-secondary/30 rounded-md px-3 py-2">
                          <div className="bg-primary/10 p-1.5 rounded">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground font-medium">Local de Abordagem</p>
                            <p className="font-semibold text-foreground">{morador.local_abordagem}</p>
                          </div>
                        </div>

                        {morador.data_nascimento && (
                          <div className="flex items-center gap-3 text-sm bg-secondary/30 rounded-md px-3 py-2">
                            <div className="bg-primary/10 p-1.5 rounded">
                              <Calendar className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-muted-foreground font-medium">Data de Nascimento</p>
                              <p className="font-semibold text-foreground">
                                {format(new Date(morador.data_nascimento), "dd/MM/yyyy", { locale: ptBR })}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Informações detalhadas */}
                  <div className="px-6 py-4 space-y-4">
                    {/* Grid de informações secundárias */}
                    <div className="grid grid-cols-2 gap-3">
                      {morador.sexo && (
                        <div className="bg-secondary/20 rounded-md p-3">
                          <p className="text-xs text-muted-foreground mb-1">Sexo</p>
                          <p className="font-medium text-foreground capitalize text-sm">{morador.sexo}</p>
                        </div>
                      )}
                      {morador.profissao && (
                        <div className="bg-secondary/20 rounded-md p-3">
                          <p className="text-xs text-muted-foreground mb-1">Profissão</p>
                          <p className="font-medium text-foreground text-sm">{morador.profissao}</p>
                        </div>
                      )}
                      {morador.cidade_natal && (
                        <div className="bg-secondary/20 rounded-md p-3">
                          <p className="text-xs text-muted-foreground mb-1">Cidade Natal</p>
                          <p className="font-medium text-foreground text-sm">{morador.cidade_natal}</p>
                        </div>
                      )}
                      {morador.tempo_situacao_rua && (
                        <div className="bg-secondary/20 rounded-md p-3">
                          <p className="text-xs text-muted-foreground mb-1">Tempo em Situação de Rua</p>
                          <p className="font-medium text-foreground text-sm">{morador.tempo_situacao_rua}</p>
                        </div>
                      )}
                      {morador.tempo_em_laguna && (
                        <div className="bg-secondary/20 rounded-md p-3">
                          <p className="text-xs text-muted-foreground mb-1">Tempo em Laguna</p>
                          <p className="font-medium text-foreground text-sm">{morador.tempo_em_laguna}</p>
                        </div>
                      )}
                      {morador.nome_mae && (
                        <div className="bg-secondary/20 rounded-md p-3 col-span-2">
                          <p className="text-xs text-muted-foreground mb-1">Nome da Mãe</p>
                          <p className="font-medium text-foreground text-sm">{morador.nome_mae}</p>
                        </div>
                      )}
                    </div>

                    {/* Badges de status */}
                    {(morador.recebe_auxilio || morador.possui_vicios || morador.passagens_policia || morador.procurou_assistencia_social) && (
                      <div>
                        <Separator className="mb-3" />
                        <div className="flex flex-wrap gap-2">
                          {morador.recebe_auxilio && (
                            <Badge variant="secondary" className="text-xs">
                              <HandHelping className="h-3 w-3 mr-1" />
                              Auxílio{morador.qual_auxilio ? `: ${morador.qual_auxilio}` : ''}
                            </Badge>
                          )}
                          {morador.possui_vicios && (
                            <Badge variant="outline" className="text-xs">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Possui Vícios
                            </Badge>
                          )}
                          {morador.passagens_policia && (
                            <Badge variant="destructive" className="text-xs">
                              Passagens Policiais
                            </Badge>
                          )}
                          {morador.procurou_assistencia_social && (
                            <Badge variant="secondary" className="text-xs">
                              Assistência Social
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Observações */}
                    {morador.observacoes && (
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-amber-900 dark:text-amber-200 mb-1">Observações</p>
                            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">{morador.observacoes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
