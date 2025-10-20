import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const TestePage = () => {
  const [tests, setTests] = useState({
    layout: false,
    styles: false,
    supabase: false,
    auth: false,
  });

  useEffect(() => {
    // Teste 1: Layout carregou
    setTests(prev => ({ ...prev, layout: true }));

    // Teste 2: Styles funcionam
    const hasStyles = document.body.classList.length > 0;
    setTests(prev => ({ ...prev, styles: hasStyles }));

    // Teste 3: Supabase conecta
    const testSupabase = async () => {
      try {
        const { data, error } = await supabase.from('moradores').select('count');
        setTests(prev => ({ ...prev, supabase: !error }));
      } catch {
        setTests(prev => ({ ...prev, supabase: false }));
      }
    };
    testSupabase();

    // Teste 4: Auth funciona
    const testAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setTests(prev => ({ ...prev, auth: !!session }));
    };
    testAuth();
  }, []);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-yellow-500 text-black">
          <CardHeader>
            <CardTitle className="text-3xl">🧪 Página de Teste</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">
              Se você está vendo este card AMARELO, o sistema está funcionando!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testes do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TestItem
              label="Layout (AppLayout)"
              passed={tests.layout}
              description="Componente de layout carregou corretamente"
            />
            <TestItem
              label="Estilos (Tailwind CSS)"
              passed={tests.styles}
              description="Classes CSS estão sendo aplicadas"
            />
            <TestItem
              label="Supabase (Conexão)"
              passed={tests.supabase}
              description="Conexão com banco de dados funcionando"
            />
            <TestItem
              label="Autenticação (Session)"
              passed={tests.auth}
              description="Usuário está autenticado"
            />
          </CardContent>
        </Card>

        <Card className="bg-blue-600">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Instruções</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Se você vê este card AZUL, os estilos funcionam</li>
              <li>Verifique os testes acima - todos devem estar ✅</li>
              <li>Abra o Console (F12) e veja se há erros</li>
              <li>Se todos os testes passarem, o problema é específico da página Cadastrados</li>
            </ol>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => window.location.href = "/cadastrados"}>
            Ir para Cadastrados
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Recarregar Testes
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

interface TestItemProps {
  label: string;
  passed: boolean;
  description: string;
}

const TestItem = ({ label, passed, description }: TestItemProps) => (
  <div className="flex items-start gap-3 p-3 border rounded-lg">
    {passed ? (
      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
    ) : (
      <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
    )}
    <div className="flex-1">
      <h4 className="font-semibold">{label}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <span className={`text-sm font-mono px-2 py-1 rounded ${passed ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
      {passed ? 'PASS' : 'FAIL'}
    </span>
  </div>
);

export default TestePage;
