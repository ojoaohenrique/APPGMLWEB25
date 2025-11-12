import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, ExternalLink, Calendar, CalendarClock, HandHelping, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: moradores = [], isLoading } = useQuery({
    queryKey: ['moradores-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('moradores')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
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

  const totalCadastros = moradores.length;
  const comAuxilio = moradores.filter(m => m.recebe_auxilio).length;
  const locaisUnicos = new Set(moradores.map(m => m.local_abordagem)).size;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Painel Geral</h1>
            <p className="text-muted-foreground">Visão geral dos cadastros</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-primary">GM Laguna</h2>
            <p className="text-sm text-muted-foreground">Guarda Municipal</p>
          </div>
        </div>

        {/* 3 Cards de Acesso Rápido */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Card Cadastrados */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            onClick={() => navigate("/cadastrados")}
          >
            <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-bold text-xl">Cadastrados</h3>
              <p className="text-sm text-muted-foreground">Ver lista de moradores</p>
            </CardContent>
          </Card>

          {/* Card Novo Cadastro */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            onClick={() => navigate("/novo-cadastro")}
          >
            <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <UserPlus className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-bold text-xl">Novo Cadastro</h3>
              <p className="text-sm text-muted-foreground">Cadastrar novo morador</p>
            </CardContent>
          </Card>

          {/* Card BNMP */}
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <ExternalLink className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-bold text-xl">BNMP</h3>
              <p className="text-sm text-muted-foreground mb-4">Consultar Mandados de Prisão</p>
              <Button asChild className="w-full">
                <a href="https://portalbnmp.cnj.jus.br/#/captcha/" target="_blank" rel="noopener noreferrer">
                  Acessar Portal CNJ
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Pessoas Cadastradas */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Pessoas Cadastradas</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : moradores.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhuma pessoa cadastrada ainda</p>
              </div>
            ) : (
              <div className="space-y-3">
                {moradores.map((morador) => (
                  <Card 
                    key={morador.id} 
                    className="cursor-pointer hover:bg-secondary/50 transition-colors"
                    onClick={() => navigate(`/editar-cadastro/${morador.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {morador.foto_url ? (
                          <img 
                            src={morador.foto_url} 
                            alt={morador.nome_completo}
                            className="h-16 w-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                            <Users className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{morador.nome_completo}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {morador.created_at ? format(new Date(morador.created_at), "dd/MM/yyyy", { locale: ptBR }) : "N/A"}
                            </span>
                            <span>{morador.local_abordagem}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
