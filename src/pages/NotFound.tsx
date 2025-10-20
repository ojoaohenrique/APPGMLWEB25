import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center text-center" style={{ height: 'calc(100vh - 150px)' }}>
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-4 text-2xl font-medium">Página não encontrada</p>
        <p className="mb-8 text-muted-foreground">A página que você procura não existe.</p>
        <Button asChild>
          <Link to="/">Voltar ao Painel</Link>
        </Button>
      </div>
    </AppLayout>
  );
};

export default NotFound;
