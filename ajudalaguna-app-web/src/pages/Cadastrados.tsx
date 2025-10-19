import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, User, HandHelping, AlertCircle, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Morador } from "@/types/morador";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MoradorDetails } from "@/components/MoradorDetails";

const Cadastrados = () => {
  const [busca, setBusca] = useState("");
  const [filtroCidade, setFiltroCidade] = useState("");
  const [filtroAuxilio, setFiltroAuxilio] = useState("");
  const [moradorSelecionado, setMoradorSelecionado] = useState<Morador | null>(null);

  const { data: moradores = [], isLoading, refetch } = useQuery({
    queryKey: ['moradores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('moradores')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Morador[];
    },
  });

  // Filtrar moradores
  const moradoresFiltrados = moradores.filter((m) => {
    const matchBusca = !busca || 
      m.nome_completo.toLowerCase().includes(busca.toLowerCase()) ||
      m.cpf?.toLowerCase().includes(busca.toLowerCase()) ||
      m.local_abordagem.toLowerCase().includes(busca.toLowerCase());

    const matchCidade = !filtroCidade || m.cidade_natal === filtroCidade;
    const matchAuxilio = !filtroAuxilio || 
      (filtroAuxilio === "sim" && m.recebe_auxilio) ||
      (filtroAuxilio === "nao" && !m.recebe_auxilio);

    return matchBusca && matchCidade && matchAuxilio;
  });

  // Extrair cidades únicas
  const cidades = Array.from(new Set(moradores.map(m => m.cidade_natal).filter(Boolean)));

  const limparFiltros = () => {
    setBusca("");
    setFiltroCidade("");
    setFiltroAuxilio("");
  };

  const getInitials = (nome: string) => {
    return nome
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Cadastrados</h1>
            <p className="text-muted-foreground">
              {moradoresFiltrados.length} {moradoresFiltrados.length === 1 ? 'registro encontrado' : 'registros encontrados'}
            </p>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, CPF ou local..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filtroCidade} onValueChange={setFiltroCidade}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as cidades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas</SelectItem>
                  {cidades.map((cidade) => (
                    <SelectItem key={cidade} value={cidade!}>
                      {cidade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filtroAuxilio} onValueChange={setFiltroAuxilio}>
                <SelectTrigger>
                  <SelectValue placeholder="Auxílio governo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="sim">Com auxílio</SelectItem>
                  <SelectItem value="nao">Sem auxílio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(busca || filtroCidade || filtroAuxilio) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={limparFiltros}
                className="w-full md:w-auto"
              >
                <X className="mr-2 h-4 w-4" />
                Limpar Filtros
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Lista de Moradores */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregando...</p>
          </div>
        ) : moradoresFiltrados.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {moradores.length === 0 
                  ? "Nenhum cadastro ainda" 
                  : "Nenhum registro encontrado com os filtros aplicados"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {moradoresFiltrados.map((morador) => (
              <Card
                key={morador.id}
                className="cursor-pointer hover:bg-secondary/50 transition"
                onClick={() => setMoradorSelecionado(morador)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={morador.foto_url || undefined} />
                      <AvatarFallback>{getInitials(morador.nome_completo)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{morador.nome_completo}</h3>
                      
                      {morador.cpf && (
                        <p className="text-sm text-muted-foreground">CPF: {morador.cpf}</p>
                      )}

                      <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{morador.local_abordagem}</span>
                      </div>

                      {morador.cidade_natal && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Natural de {morador.cidade_natal}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2 mt-3">
                        {morador.recebe_auxilio && (
                          <Badge variant="secondary" className="text-xs">
                            <HandHelping className="h-3 w-3 mr-1" />
                            Auxílio
                          </Badge>
                        )}

                        {morador.passagens_policia && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Passagens
                          </Badge>
                        )}

                        <Badge variant="outline" className="text-xs">
                          {format(new Date(morador.created_at), "dd/MM/yyyy", { locale: ptBR })}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Sheet com detalhes */}
      <Sheet open={!!moradorSelecionado} onOpenChange={() => setMoradorSelecionado(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Detalhes do Cadastro</SheetTitle>
          </SheetHeader>
          {moradorSelecionado && (
            <MoradorDetails
              morador={moradorSelecionado}
              onClose={() => setMoradorSelecionado(null)}
              onUpdate={refetch}
            />
          )}
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
};

export default Cadastrados;
