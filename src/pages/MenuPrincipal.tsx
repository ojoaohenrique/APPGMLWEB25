import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { 
  Heart, 
  Newspaper, 
  Syringe, 
  Megaphone, 
  Lightbulb, 
  Users,
  UserCircle
} from "lucide-react";

const MenuPrincipal = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "S.O.S Mulher",
      icon: Heart,
      color: "bg-pink-500 hover:bg-pink-600",
      route: "/sos-mulher"
    },
    {
      title: "Notícias",
      icon: Newspaper,
      color: "bg-blue-500 hover:bg-blue-600",
      route: "/noticias"
    },
    {
      title: "Vacina COVID-19",
      icon: Syringe,
      color: "bg-cyan-400 hover:bg-cyan-500",
      route: "/vacina-covid"
    },
    {
      title: "Solicitações de Serviço",
      icon: Megaphone,
      color: "bg-gray-500 hover:bg-gray-600",
      route: "/solicitacoes"
    },
    {
      title: "Ilumina Cajamar",
      icon: Lightbulb,
      color: "bg-yellow-500 hover:bg-yellow-600",
      route: "/ilumina"
    },
    {
      title: "Farmácias e Estabelecimentos",
      icon: Users,
      color: "bg-blue-600 hover:bg-blue-700",
      route: "/farmacias"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700">
      {/* Header */}
      <div className="bg-blue-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/logo-guarda.svg" 
            alt="Logo Guarda Municipal" 
            className="h-12 w-12 bg-white rounded-full p-1"
          />
          <div>
            <h1 className="text-xl font-bold">CAJAMAR</h1>
            <p className="text-sm text-blue-200">PREFEITURA</p>
          </div>
        </div>
        <UserCircle className="h-8 w-8" />
      </div>

      {/* Wave decoration */}
      <div className="relative h-24 overflow-hidden">
        <svg 
          viewBox="0 0 1440 120" 
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,64L1440,96L1440,120L0,120Z" 
            fill="white"
          />
          <path 
            d="M0,80L1440,48L1440,120L0,120Z" 
            fill="rgba(255,255,255,0.5)"
          />
        </svg>
      </div>

      {/* Menu Grid */}
      <div className="px-4 pb-8 -mt-8">
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className={`${item.color} text-white cursor-pointer transition-all duration-200 transform hover:scale-105 shadow-lg`}
              onClick={() => navigate(item.route)}
            >
              <div className="p-6 flex flex-col items-center justify-center text-center h-32">
                <item.icon className="h-10 w-10 mb-3" />
                <p className="font-semibold text-sm leading-tight">{item.title}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white p-4 text-center">
        <p className="text-sm font-medium">LAGUNA</p>
      </div>
    </div>
  );
};

export default MenuPrincipal;
