import { AppLayout } from "@/components/layout/AppLayout";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Camera, Upload, MapPin, User, FileText, MapPinned, Loader2 } from "lucide-react";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";
import { z } from "zod";

const NovoCadastro = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [capturingLocation, setCapturingLocation] = useState(false);
  const isEditMode = !!id;

  // Informações pessoais
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date>();
  const [dataNascimentoInput, setDataNascimentoInput] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [sexo, setSexo] = useState("");
  const [cidadeNatal, setCidadeNatal] = useState("");
  const [profissao, setProfissao] = useState("");

  // Situação social
  const [recebeAuxilio, setRecebeAuxilio] = useState(false);
  const [qualAuxilio, setQualAuxilio] = useState("");
  const [tempoSituacaoRua, setTempoSituacaoRua] = useState("");
  const [tempoEmLaguna, setTempoEmLaguna] = useState("");
  const [tempoPretendeFicar, setTempoPretendeFicar] = useState("");
  const [procurouAssistencia, setProcurouAssistencia] = useState(false);
  const [qualServico, setQualServico] = useState("");

  // Localização
  const [localAbordagem, setLocalAbordagem] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Informações adicionais
  const [possuiVicios, setPossuiVicios] = useState(false);
  const [quaisVicios, setQuaisVicios] = useState("");
  const [passagensPolicia, setPassagensPolicia] = useState(false);
  const [observacoesPassagens, setObservacoesPassagens] = useState("");
  const [observacoes, setObservacoes] = useState("");

  // Foto
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string>("");

  // Funções de máscara
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value;
  };

  const formatDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2');
    }
    return value;
  };

  const handleDataNascimentoChange = (value: string) => {
    const formatted = formatDate(value);
    setDataNascimentoInput(formatted);
    
    // Tentar parsear a data se estiver completa
    if (formatted.length === 10) {
      try {
        const parsedDate = parse(formatted, "dd/MM/yyyy", new Date());
        if (!isNaN(parsedDate.getTime())) {
          setDataNascimento(parsedDate);
        }
      } catch (error) {
        // Ignorar erro de parsing
      }
    }
  };

  const validateCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, '');
    if (numbers.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(numbers)) return false;
    
    // Validação dos dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(numbers.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(numbers.charAt(10))) return false;
    
    return true;
  };

  // Buscar dados do morador se estiver em modo de edição
  useEffect(() => {
    if (isEditMode && id) {
      setLoadingData(true);
      const fetchMorador = async () => {
        try {
          const { data, error } = await supabase
            .from('moradores')
            .select('*')
            .eq('id', id)
            .single();

          if (error) throw error;

          if (data) {
            setNomeCompleto(data.nome_completo || "");
            setCpf(data.cpf || "");
            if (data.data_nascimento) {
              const date = new Date(data.data_nascimento);
              setDataNascimento(date);
              setDataNascimentoInput(format(date, "dd/MM/yyyy"));
            }
            setNomeMae(data.nome_mae || "");
            setSexo(data.sexo || "");
            setCidadeNatal(data.cidade_natal || "");
            setProfissao(data.profissao || "");
            setRecebeAuxilio(data.recebe_auxilio || false);
            setQualAuxilio(data.qual_auxilio || "");
            setTempoSituacaoRua(data.tempo_situacao_rua || "");
            setTempoEmLaguna(data.tempo_em_laguna || "");
            setTempoPretendeFicar(data.tempo_pretende_ficar || "");
            setProcurouAssistencia(data.procurou_assistencia_social || false);
            setQualServico(data.qual_servico_procurou || "");
            setLocalAbordagem(data.local_abordagem || "");
            setLatitude(data.latitude?.toString() || "");
            setLongitude(data.longitude?.toString() || "");
            setPossuiVicios(data.possui_vicios || false);
            setQuaisVicios(data.quais_vicios || "");
            setPassagensPolicia(data.passagens_policia || false);
            setObservacoesPassagens(data.observacoes_passagens || "");
            setObservacoes(data.observacoes || "");
            if (data.foto_url) {
              setFotoPreview(data.foto_url);
            }
          }
        } catch (error: any) {
          toast({
            title: "Erro ao carregar dados",
            description: error.message,
            variant: "destructive",
          });
          navigate("/cadastrados");
        } finally {
          setLoadingData(false);
        }
      };

      fetchMorador();
    }
  }, [id, isEditMode, navigate, toast]);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureLocation = () => {
    setCapturingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
          toast({
            title: "Localização capturada!",
            description: "Coordenadas GPS obtidas com sucesso",
          });
          setCapturingLocation(false);
        },
        (error) => {
          toast({
            title: "Erro ao capturar localização",
            description: "Verifique as permissões de GPS",
            variant: "destructive",
          });
          setCapturingLocation(false);
        }
      );
    } else {
      toast({
        title: "GPS não disponível",
        description: "Seu dispositivo não suporta geolocalização",
        variant: "destructive",
      });
      setCapturingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!nomeCompleto || !localAbordagem) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome completo e local da abordagem",
        variant: "destructive",
      });
      return;
    }

    // Validação de CPF se preenchido
    if (cpf && !validateCPF(cpf)) {
      toast({
        title: "CPF inválido",
        description: "Por favor, verifique o CPF informado",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      let fotoUrl = null;

      // Upload da foto se existir
      if (foto) {
        const fileExt = foto.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const { error: uploadError, data } = await supabase.storage
          .from('morador-fotos')
          .upload(fileName, foto);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('morador-fotos')
          .getPublicUrl(fileName);

        fotoUrl = publicUrl;
      }

      // Preparar dados do morador
      const moradorData = {
        user_id: user.id,
        nome_completo: nomeCompleto,
        cpf: cpf || null,
        data_nascimento: dataNascimento ? format(dataNascimento, 'yyyy-MM-dd') : null,
        nome_mae: nomeMae || null,
        sexo: (sexo || null) as 'masculino' | 'feminino' | 'outro' | null,
        cidade_natal: cidadeNatal || null,
        profissao: profissao || null,
        recebe_auxilio: recebeAuxilio,
        qual_auxilio: qualAuxilio || null,
        tempo_situacao_rua: tempoSituacaoRua || null,
        tempo_em_laguna: tempoEmLaguna || null,
        tempo_pretende_ficar: tempoPretendeFicar || null,
        procurou_assistencia_social: procurouAssistencia,
        qual_servico_procurou: qualServico || null,
        local_abordagem: localAbordagem,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        possui_vicios: possuiVicios,
        quais_vicios: quaisVicios || null,
        passagens_policia: passagensPolicia,
        observacoes_passagens: observacoesPassagens || null,
        foto_url: fotoUrl || (isEditMode && fotoPreview ? fotoPreview : null),
        observacoes: observacoes || null,
        status_sincronizacao: 'enviado',
      };

      // Inserir ou atualizar morador
      let error;
      if (isEditMode && id) {
        const result = await supabase
          .from('moradores')
          .update(moradorData)
          .eq('id', id);
        error = result.error;
      } else {
        const result = await supabase
          .from('moradores')
          .insert([moradorData]);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: isEditMode ? "Cadastro atualizado!" : "Cadastro realizado!",
        description: isEditMode ? "Alterações salvas com sucesso" : "Morador cadastrado com sucesso",
      });

      navigate("/cadastrados");
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{isEditMode ? "Editar Cadastro" : "Novo Cadastro"}</h1>
            <p className="text-muted-foreground">
              {isEditMode ? "Atualizar informações do morador" : "Cadastrar novo morador em situação de rua"}
            </p>
          </div>
          <img 
            src="/logo-guarda.png" 
            alt="Logo Guarda Municipal" 
            className="h-24 w-24 object-contain"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Foto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Foto do Morador
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fotoPreview && (
                <div className="flex justify-center">
                  <img
                    src={fotoPreview}
                    alt="Preview"
                    className="h-48 w-48 object-cover rounded-lg border-2 border-border"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <Label htmlFor="foto-upload" className="flex-1">
                  <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary transition">
                    <Upload className="h-5 w-5" />
                    <span>Escolher Foto</span>
                  </div>
                  <Input
                    id="foto-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFotoChange}
                  />
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Informações Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(formatCPF(e.target.value))}
                    placeholder="000.000.000-00"
                    maxLength={14}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                  <Input
                    id="dataNascimento"
                    value={dataNascimentoInput}
                    onChange={(e) => handleDataNascimentoChange(e.target.value)}
                    placeholder="DD/MM/AAAA"
                    maxLength={10}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sexo">Sexo</Label>
                  <Select value={sexo} onValueChange={setSexo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nomeMae">Nome da Mãe</Label>
                  <Input
                    id="nomeMae"
                    value={nomeMae}
                    onChange={(e) => setNomeMae(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidadeNatal">Cidade Natal</Label>
                  <Input
                    id="cidadeNatal"
                    value={cidadeNatal}
                    onChange={(e) => setCidadeNatal(e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="profissao">Profissão</Label>
                  <Input
                    id="profissao"
                    value={profissao}
                    onChange={(e) => setProfissao(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Situação Social */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Situação Social
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="recebeAuxilio">Recebe auxílio do governo?</Label>
                <Switch
                  id="recebeAuxilio"
                  checked={recebeAuxilio}
                  onCheckedChange={setRecebeAuxilio}
                />
              </div>

              {recebeAuxilio && (
                <div className="space-y-2">
                  <Label htmlFor="qualAuxilio">Qual auxílio?</Label>
                  <Input
                    id="qualAuxilio"
                    value={qualAuxilio}
                    onChange={(e) => setQualAuxilio(e.target.value)}
                    placeholder="Ex: Bolsa Família, BPC..."
                  />
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="tempoRua">Tempo em situação de rua</Label>
                  <Input
                    id="tempoRua"
                    value={tempoSituacaoRua}
                    onChange={(e) => setTempoSituacaoRua(e.target.value)}
                    placeholder="Ex: 6 meses"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempoLaguna">Tempo em Laguna</Label>
                  <Input
                    id="tempoLaguna"
                    value={tempoEmLaguna}
                    onChange={(e) => setTempoEmLaguna(e.target.value)}
                    placeholder="Ex: 2 anos"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempoFicar">Tempo que pretende ficar</Label>
                  <Input
                    id="tempoFicar"
                    value={tempoPretendeFicar}
                    onChange={(e) => setTempoPretendeFicar(e.target.value)}
                    placeholder="Ex: 1 ano"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="procurouAssistencia">Já procurou assistência social?</Label>
                <Switch
                  id="procurouAssistencia"
                  checked={procurouAssistencia}
                  onCheckedChange={setProcurouAssistencia}
                />
              </div>

              {procurouAssistencia && (
                <div className="space-y-2">
                  <Label htmlFor="qualServico">Qual serviço procurou?</Label>
                  <Input
                    id="qualServico"
                    value={qualServico}
                    onChange={(e) => setQualServico(e.target.value)}
                    placeholder="Ex: CRAS, CREAS..."
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Localização */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPinned className="h-5 w-5" />
                Localização da Abordagem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="local">Local da Abordagem *</Label>
                <Input
                  id="local"
                  value={localAbordagem}
                  onChange={(e) => setLocalAbordagem(e.target.value)}
                  placeholder="Ex: Praça Vidal Ramos"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="-28.4843"
                    type="number"
                    step="any"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="-48.7787"
                    type="number"
                    step="any"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={captureLocation}
                disabled={capturingLocation}
              >
                {capturingLocation ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Capturando...
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4" />
                    Capturar Localização GPS
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="vicios">Possui vícios?</Label>
                <Switch
                  id="vicios"
                  checked={possuiVicios}
                  onCheckedChange={setPossuiVicios}
                />
              </div>

              {possuiVicios && (
                <div className="space-y-2">
                  <Label htmlFor="quaisVicios">Quais vícios?</Label>
                  <Input
                    id="quaisVicios"
                    value={quaisVicios}
                    onChange={(e) => setQuaisVicios(e.target.value)}
                    placeholder="Ex: Álcool, Tabaco, Drogas..."
                  />
                </div>
              )}

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="passagens">Passagens pela polícia?</Label>
                <Switch
                  id="passagens"
                  checked={passagensPolicia}
                  onCheckedChange={setPassagensPolicia}
                />
              </div>

              {passagensPolicia && (
                <div className="space-y-2">
                  <Label htmlFor="obsPassagens">Observações sobre passagens</Label>
                  <Textarea
                    id="obsPassagens"
                    value={observacoesPassagens}
                    onChange={(e) => setObservacoesPassagens(e.target.value)}
                    placeholder="Detalhes..."
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações Gerais</Label>
                <Textarea
                  id="observacoes"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Informações adicionais relevantes..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Botões */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/cadastrados")}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                isEditMode ? "Salvar Alterações" : "Salvar Cadastro"
              )}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default NovoCadastro;
