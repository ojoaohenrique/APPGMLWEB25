import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, MapPin, HandHelping, AlertCircle, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Dados = () => {
  const { data: moradores = [], isLoading } = useQuery({
    queryKey: ['moradores-dashboard'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('moradores')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Estatísticas gerais
  const totalCadastros = moradores.length;
  const comAuxilio = moradores.filter(m => m.recebe_auxilio).length;
  const comVicios = moradores.filter(m => m.possui_vicios).length;
  const comPassagens = moradores.filter(m => m.passagens_policia).length;
  const procuraramAssistencia = moradores.filter(m => m.procurou_assistencia_social).length;

  // Locais de abordagem
  const locaisCounts = moradores.reduce((acc: Record<string, number>, m) => {
    const local = m.local_abordagem || 'Não informado';
    acc[local] = (acc[local] || 0) + 1;
    return acc;
  }, {});
  const topLocais = Object.entries(locaisCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Tipos de auxílio
  const auxiliosCounts = moradores
    .filter(m => m.recebe_auxilio && m.qual_auxilio)
    .reduce((acc: Record<string, number>, m) => {
      const auxilio = m.qual_auxilio || 'Não especificado';
      acc[auxilio] = (acc[auxilio] || 0) + 1;
      return acc;
    }, {});
  const topAuxilios = Object.entries(auxiliosCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Cadastros por mês (últimos 6 meses)
  const cadastrosPorMes = moradores.reduce((acc: Record<string, number>, m) => {
    const data = new Date(m.created_at);
    const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`;
    acc[mesAno] = (acc[mesAno] || 0) + 1;
    return acc;
  }, {});

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard de Dados</h1>
          <p className="text-muted-foreground">Análise estatística dos cadastros</p>
        </div>

        {/* Cards de Estatísticas Principais */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Cadastros</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCadastros}</div>
              <p className="text-xs text-muted-foreground">Pessoas cadastradas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recebem Auxílio</CardTitle>
              <HandHelping className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{comAuxilio}</div>
              <p className="text-xs text-muted-foreground">
                {totalCadastros > 0 ? ((comAuxilio / totalCadastros) * 100).toFixed(1) : 0}% do total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Possuem Vícios</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{comVicios}</div>
              <p className="text-xs text-muted-foreground">
                {totalCadastros > 0 ? ((comVicios / totalCadastros) * 100).toFixed(1) : 0}% do total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Passagens Policiais</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{comPassagens}</div>
              <p className="text-xs text-muted-foreground">
                {totalCadastros > 0 ? ((comPassagens / totalCadastros) * 100).toFixed(1) : 0}% do total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos e Tabelas */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Top 5 Locais de Abordagem */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Top 5 Locais de Abordagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topLocais.map(([local, count]) => (
                  <div key={local} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate max-w-[200px]">{local}</span>
                      <span className="text-muted-foreground">{count} pessoas</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(count / totalCadastros) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                {topLocais.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum dado disponível
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Top 5 Tipos de Auxílio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HandHelping className="h-5 w-5" />
                Top 5 Tipos de Auxílio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topAuxilios.map(([auxilio, count]) => (
                  <div key={auxilio} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate max-w-[200px]">{auxilio}</span>
                      <span className="text-muted-foreground">{count} pessoas</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${(count / comAuxilio) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                {topAuxilios.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum dado disponível
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Assistência Social */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Assistência Social
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <span className="font-medium">Procuraram Assistência</span>
                  <span className="text-2xl font-bold">{procuraramAssistencia}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <span className="font-medium">Não Procuraram</span>
                  <span className="text-2xl font-bold">{totalCadastros - procuraramAssistencia}</span>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    {totalCadastros > 0 
                      ? `${((procuraramAssistencia / totalCadastros) * 100).toFixed(1)}% procuraram assistência social`
                      : 'Nenhum dado disponível'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumo de Situações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Resumo Geral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <span className="text-sm font-medium">Total de Cadastros</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{totalCadastros}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <span className="text-sm font-medium">Com Auxílio</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">{comAuxilio}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <span className="text-sm font-medium">Com Vícios</span>
                  <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{comVicios}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <span className="text-sm font-medium">Com Passagens</span>
                  <span className="text-lg font-bold text-red-600 dark:text-red-400">{comPassagens}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dados;
