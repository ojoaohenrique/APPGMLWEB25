import { Morador } from "@/types/morador";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit, Trash2, MapPin, Calendar, User, FileText, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

interface MoradorDetailsProps {
  morador: Morador;
  onClose: () => void;
  onUpdate: () => void;
}

export function MoradorDetails({ morador, onClose, onUpdate }: MoradorDetailsProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const getInitials = (nome: string) => {
    return nome
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDelete = async () => {
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

      onUpdate();
      onClose();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Cabeçalho com foto */}
      <div className="flex items-start gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={morador.foto_url || undefined} />
          <AvatarFallback className="text-2xl">{getInitials(morador.nome_completo)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h2 className="text-2xl font-bold">{morador.nome_completo}</h2>
          {morador.cpf && (
            <p className="text-muted-foreground">CPF: {morador.cpf}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-3">
            {morador.recebe_auxilio && (
              <Badge variant="secondary">
                Recebe Auxílio
              </Badge>
            )}
            {morador.passagens_policia && (
              <Badge variant="destructive">
                Passagens Policiais
              </Badge>
            )}
            {morador.possui_vicios && (
              <Badge variant="outline">
                Possui Vícios
              </Badge>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Informações Pessoais */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <User className="h-4 w-4" />
            Informações Pessoais
          </h3>

          {morador.data_nascimento && (
            <div>
              <p className="text-sm text-muted-foreground">Data de Nascimento</p>
              <p className="font-medium">
                {format(new Date(morador.data_nascimento), "dd/MM/yyyy", { locale: ptBR })}
              </p>
            </div>
          )}

          {morador.sexo && (
            <div>
              <p className="text-sm text-muted-foreground">Sexo</p>
              <p className="font-medium capitalize">{morador.sexo}</p>
            </div>
          )}

          {morador.nome_mae && (
            <div>
              <p className="text-sm text-muted-foreground">Nome da Mãe</p>
              <p className="font-medium">{morador.nome_mae}</p>
            </div>
          )}

          {morador.cidade_natal && (
            <div>
              <p className="text-sm text-muted-foreground">Cidade Natal</p>
              <p className="font-medium">{morador.cidade_natal}</p>
            </div>
          )}

          {morador.profissao && (
            <div>
              <p className="text-sm text-muted-foreground">Profissão</p>
              <p className="font-medium">{morador.profissao}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Situação Social */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Situação Social
          </h3>

          <div>
            <p className="text-sm text-muted-foreground">Recebe Auxílio do Governo</p>
            <p className="font-medium">{morador.recebe_auxilio ? "Sim" : "Não"}</p>
            {morador.qual_auxilio && (
              <p className="text-sm text-muted-foreground mt-1">({morador.qual_auxilio})</p>
            )}
          </div>

          {morador.tempo_situacao_rua && (
            <div>
              <p className="text-sm text-muted-foreground">Tempo em Situação de Rua</p>
              <p className="font-medium">{morador.tempo_situacao_rua}</p>
            </div>
          )}

          {morador.tempo_em_laguna && (
            <div>
              <p className="text-sm text-muted-foreground">Tempo em Laguna</p>
              <p className="font-medium">{morador.tempo_em_laguna}</p>
            </div>
          )}

          {morador.tempo_pretende_ficar && (
            <div>
              <p className="text-sm text-muted-foreground">Tempo que Pretende Ficar</p>
              <p className="font-medium">{morador.tempo_pretende_ficar}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-muted-foreground">Procurou Assistência Social</p>
            <p className="font-medium">{morador.procurou_assistencia_social ? "Sim" : "Não"}</p>
            {morador.qual_servico_procurou && (
              <p className="text-sm text-muted-foreground mt-1">({morador.qual_servico_procurou})</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Localização */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Localização da Abordagem
          </h3>

          <div>
            <p className="text-sm text-muted-foreground">Local</p>
            <p className="font-medium">{morador.local_abordagem}</p>
          </div>

          {morador.latitude && morador.longitude && (
            <div>
              <p className="text-sm text-muted-foreground">Coordenadas GPS</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">
                  {morador.latitude}, {morador.longitude}
                </p>
                <a
                  href={`https://www.google.com/maps?q=${morador.latitude},${morador.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  <MapPin className="h-4 w-4" />
                  Ver no Mapa
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informações Adicionais */}
      {(morador.passagens_policia || morador.observacoes) && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Informações Adicionais
            </h3>

            {morador.passagens_policia && morador.observacoes_passagens && (
              <div>
                <p className="text-sm text-muted-foreground">Observações sobre Passagens Policiais</p>
                <p className="font-medium">{morador.observacoes_passagens}</p>
              </div>
            )}

            {morador.observacoes && (
              <div>
                <p className="text-sm text-muted-foreground">Observações Gerais</p>
                <p className="font-medium">{morador.observacoes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Data de Cadastro */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Cadastrado em {format(new Date(morador.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => navigate(`/editar-cadastro/${morador.id}`)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="flex-1">
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
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
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
