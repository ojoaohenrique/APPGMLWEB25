import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">404</h1>
            <p className="text-xl text-muted-foreground mb-6">Página não encontrada</p>
            <p className="text-sm text-muted-foreground mb-6">
              A página que você está procurando não existe ou foi movida.
            </p>
            <Button onClick={() => navigate("/cadastrados")} className="w-full">
              Voltar para Cadastrados
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default NotFound;
