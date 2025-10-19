import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, HandHelping, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
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

  const totalCadastros = moradores.length;
  const comAuxilio = moradores.filter(m => m.recebe_auxilio).length;
  const locaisUnicos = new Set(moradores.map(m => m.local_abordagem)).size;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Painel Geral</h1>
          <p className="text-muted-foreground">Visão geral dos cadastros</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
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

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : moradores.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Nenhum cadastro ainda</p>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
