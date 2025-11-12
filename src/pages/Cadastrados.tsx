import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, User, Calendar, Edit, Trash2, AlertCircle, RefreshCw, Users, CalendarClock, HandHelping, Download, FileJson } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Morador } from "@/types/morador";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { usePermissions } from "@/hooks/usePermissions";
import { exportarTodosMoradoresCSV, exportarTodosMoradoresJSON } from "@/lib/exportUtils";

const Cadastrados = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [busca, setBusca] = useState("");
  const { permissions } = usePermissions();

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

  const InfoItem = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value?: string | null }) => {
    if (!value) return null;

    return (
      <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-background px-4 py-3 shadow-sm">
        <div className="mt-1 rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-1 text-sm font-medium leading-tight text-foreground">{value}</p>
        </div>
      </div>
    );
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
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline"
              onClick={() => {
                exportarTodosMoradoresJSON(moradores);
                toast({
                  title: "Exportado!",
                  description: `${moradores.length} cadastros exportados em JSON`,
                });
              }}
              disabled={moradores.length === 0}
            >
              <FileJson className="mr-2 h-4 w-4" />
              Exportar Todos (JSON)
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                exportarTodosMoradoresCSV(moradores);
                toast({
                  title: "Exportado!",
                  description: `${moradores.length} cadastros exportados em CSV`,
                });
              }}
              disabled={moradores.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar Todos (CSV)
            </Button>
            <Button onClick={() => navigate("/novo-cadastro")} className="bg-primary">
              <User className="mr-2 h-4 w-4" />
              Novo Cadastro
            </Button>
          </div>
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
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {moradoresFiltrados.map((morador) => (
              <Card 
                key={morador.id} 
                className="border border-border/60 bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-primary/5 px-6 py-4">
                  <Badge variant="secondary" className="text-sm font-semibold px-3 py-1">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    {format(new Date(morador.created_at), "dd/MM/yyyy", { locale: ptBR })}
                  </Badge>
                  <div className="flex flex-wrap gap-2">
                    {!permissions?.isReadOnly && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/editar-cadastro/${morador.id}`)}
                        className="h-9 px-4 font-bold uppercase tracking-wide border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                        title="Editar cadastro"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                    )}
                    {permissions?.canDelete && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="h-9 px-3 font-semibold" 
                            title="Excluir cadastro"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o cadastro de {morador.nome_completo}? Esta ação não pode ser desfeita.
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
                    )}
                  </div>
                </div>

                <CardContent className="space-y-6 p-6">
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="flex justify-center md:block">
                      <div className="relative">
                        <Avatar className="h-36 w-36 border-4 border-background shadow-lg ring-2 ring-primary/20">
                          <AvatarImage src={morador.foto_url || undefined} className="object-cover" />
                          <AvatarFallback className="text-4xl bg-primary/10 text-primary font-bold">
                            {getInitials(morador.nome_completo)}
                          </AvatarFallback>
                        </Avatar>
                        {morador.foto_url && (
                          <div className="absolute -bottom-2 -right-2 rounded-full border-4 border-background bg-green-500 p-2 shadow-md">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold leading-tight text-foreground">{morador.nome_completo}</h3>
                        {morador.profissao && (
                          <p className="text-sm text-muted-foreground">Profissão: {morador.profissao}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <InfoItem icon={User} label="CPF" value={morador.cpf} />
                        <InfoItem icon={MapPin} label="Local de Abordagem" value={morador.local_abordagem} />
                        <InfoItem 
                          icon={Calendar} 
                          label="Data de Nascimento" 
                          value={morador.data_nascimento ? format(new Date(morador.data_nascimento), "dd/MM/yyyy", { locale: ptBR }) : undefined} 
                        />
                        <InfoItem icon={Users} label="Sexo" value={morador.sexo} />
                        <InfoItem icon={HandHelping} label="Tempo em Situação de Rua" value={morador.tempo_situacao_rua} />
                        <InfoItem icon={CalendarClock} label="Tempo em Laguna" value={morador.tempo_em_laguna} />
                        {morador.motivo_situacao_rua && (
                          <div className="md:col-span-2">
                            <InfoItem icon={AlertCircle} label="Motivo da Situação de Rua" value={morador.motivo_situacao_rua} />
                          </div>
                        )}
                        <InfoItem icon={MapPin} label="Bairro" value={morador.bairro} />
                        <InfoItem icon={MapPin} label="Rua" value={morador.rua} />
                        {morador.nome_mae && (
                          <div className="md:col-span-2">
                            <InfoItem icon={User} label="Nome da Mãe" value={morador.nome_mae} />
                          </div>
                        )}
                        {morador.cidade_natal && (
                          <div className="md:col-span-2">
                            <InfoItem icon={MapPin} label="Cidade Natal" value={morador.cidade_natal} />
                          </div>
                        )}
                        {morador.tempo_pretende_ficar && (
                          <div className="md:col-span-2">
                            <InfoItem icon={CalendarClock} label="Tempo que Pretende Ficar" value={morador.tempo_pretende_ficar} />
                          </div>
                        )}
                        {morador.informacoes_local && (
                          <div className="md:col-span-2">
                            <InfoItem icon={MapPin} label="Informações do Local" value={morador.informacoes_local} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {(morador.recebe_auxilio || morador.possui_vicios || morador.passagens_policia || morador.procurou_assistencia_social) && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</p>
                      <div className="flex flex-wrap gap-2">
                        {morador.recebe_auxilio && (
                          <Badge variant="secondary" className="px-3 py-1.5 text-sm font-semibold">
                            <HandHelping className="mr-1.5 h-4 w-4" />
                            Auxílio{morador.qual_auxilio ? `: ${morador.qual_auxilio}` : ''}
                          </Badge>
                        )}
                        {morador.possui_vicios && (
                          <Badge variant="outline" className="px-3 py-1.5 text-sm font-semibold">
                            <AlertCircle className="mr-1.5 h-4 w-4" />
                            Possui Vícios
                          </Badge>
                        )}
                        {morador.passagens_policia && (
                          <Badge variant="destructive" className="px-3 py-1.5 text-sm font-semibold">
                            Passagens Policiais
                          </Badge>
                        )}
                        {morador.procurou_assistencia_social && (
                          <Badge variant="secondary" className="px-3 py-1.5 text-sm font-semibold">
                            Assistência Social
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {morador.observacoes && (
                    <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/20">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                        <div className="flex-1">
                          <p className="text-sm font-bold uppercase tracking-wide text-amber-900 dark:text-amber-100">Observações</p>
                          <p className="mt-1 text-sm font-medium leading-relaxed text-amber-800 dark:text-amber-200">{morador.observacoes}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Button 
                      variant="secondary" 
                      className="flex-1 min-w-[160px] font-semibold"
                      onClick={() => navigate(`/detalhes-cadastro/${morador.id}`)}
                    >
                      Ver detalhes
                    </Button>
                    {!permissions?.isReadOnly && (
                      <Button 
                        className="flex-1 min-w-[160px] font-semibold"
                        onClick={() => navigate(`/editar-cadastro/${morador.id}`)}
                      >
                        Editar cadastro
                      </Button>
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
}

export default Cadastrados;
