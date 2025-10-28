import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type Cargo = 'comandante' | 'administrador' | 'desenvolvedor' | 'guarda' | 'estagiario' | 'visualizador';

export interface UserPermissions {
  cargo: Cargo;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canViewAll: boolean;
  isAdmin: boolean;
  isReadOnly: boolean;
}

const PERMISSIONS_MAP: Record<Cargo, Omit<UserPermissions, 'cargo'>> = {
  comandante: {
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canViewAll: true,
    isAdmin: true,
    isReadOnly: false,
  },
  administrador: {
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canViewAll: true,
    isAdmin: true,
    isReadOnly: false,
  },
  desenvolvedor: {
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canViewAll: true,
    isAdmin: false,
    isReadOnly: false,
  },
  guarda: {
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canViewAll: true,
    isAdmin: false,
    isReadOnly: false,
  },
  estagiario: {
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canViewAll: true,
    isAdmin: false,
    isReadOnly: true,
  },
  visualizador: {
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canViewAll: true,
    isAdmin: false,
    isReadOnly: true,
  },
};

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<UserPermissions | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setPermissions(null);
          setLoading(false);
          return;
        }

        setUserEmail(user.email || '');
        setUserId(user.id);

        // Buscar cargo do usuário
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('cargo')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Erro ao buscar cargo:', error);
          // Usar cargo padrão em caso de erro
          const defaultCargo: Cargo = 'visualizador';
          setPermissions({
            cargo: defaultCargo,
            ...PERMISSIONS_MAP[defaultCargo],
          });
        } else {
          const cargo = (profile?.cargo || 'visualizador') as Cargo;
          setPermissions({
            cargo,
            ...PERMISSIONS_MAP[cargo],
          });
        }
      } catch (error) {
        console.error('Erro ao carregar permissões:', error);
        setPermissions(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPermissions();

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchUserPermissions();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    permissions,
    loading,
    userEmail,
    userId,
    isAuthenticated: !!permissions,
  };
};

// Helper para obter label do cargo em português
export const getCargoLabel = (cargo: Cargo): string => {
  const labels: Record<Cargo, string> = {
    comandante: 'Comandante',
    administrador: 'Administrador',
    desenvolvedor: 'Desenvolvedor',
    guarda: 'Guarda',
    estagiario: 'Estagiário',
    visualizador: 'Visualizador',
  };
  return labels[cargo] || cargo;
};

// Helper para obter cor do badge do cargo
export const getCargoBadgeColor = (cargo: Cargo): string => {
  const colors: Record<Cargo, string> = {
    comandante: 'bg-purple-500 text-white',
    administrador: 'bg-blue-500 text-white',
    desenvolvedor: 'bg-green-500 text-white',
    guarda: 'bg-cyan-500 text-white',
    estagiario: 'bg-yellow-500 text-black',
    visualizador: 'bg-gray-500 text-white',
  };
  return colors[cargo] || 'bg-gray-500 text-white';
};
