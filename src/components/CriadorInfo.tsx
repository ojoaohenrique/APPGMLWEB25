import { User } from "lucide-react";

interface CriadorInfoProps {
  criadorNome?: string;
  dataCriacao?: string;
  className?: string;
}

export const CriadorInfo = ({ criadorNome, dataCriacao, className = "" }: CriadorInfoProps) => {
  if (!criadorNome && !dataCriacao) return null;

  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      <User className="h-4 w-4" />
      <span>
        {criadorNome && <span className="font-medium">Registrado por: {criadorNome}</span>}
        {criadorNome && dataCriacao && <span className="mx-2">•</span>}
        {dataCriacao && <span>em {dataCriacao}</span>}
      </span>
    </div>
  );
};
