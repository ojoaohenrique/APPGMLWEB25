import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ThumbsUp, 
  ThumbsDown, 
  Clock, 
  FileText,
  ChevronLeft
} from "lucide-react";

const Atendimento = () => {
  const navigate = useNavigate();

  const handleCheckIn = () => {
    // Implementar lógica de check-in
    console.log("Check-in");
  };

  const handleCheckOut = () => {
    // Implementar lógica de check-out
    console.log("Check-out");
  };

  const handleRequestCheckIn = () => {
    // Implementar lógica de solicitação de check-in
    console.log("Request Check-in");
  };

  const handleNoAttendance = () => {
    // Implementar lógica de relatório sem atendimento
    console.log("No attendance report");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700">
      {/* Header */}
      <div className="bg-blue-900 text-white p-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-blue-800"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Atendimento</h1>
        </div>
      </div>

      {/* Date and Time Display */}
      <div className="text-center text-white py-8">
        <div className="text-4xl font-light mb-2">
          {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
        </div>
        <div className="text-lg">
          {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Wave decoration */}
      <div className="relative h-20 overflow-hidden">
        <svg 
          viewBox="0 0 1440 120" 
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,64L1440,96L1440,120L0,120Z" 
            fill="white"
          />
        </svg>
      </div>

      {/* Action Cards */}
      <div className="px-4 pb-8 -mt-4">
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {/* Check-in */}
          <Card
            className="bg-white cursor-pointer transition-all duration-200 transform hover:scale-105 shadow-lg border-2 border-gray-200"
            onClick={handleCheckIn}
          >
            <div className="p-6 flex flex-col items-center justify-center text-center h-40">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <ThumbsUp className="h-8 w-8 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-700">Check-In</p>
            </div>
          </Card>

          {/* Check-out */}
          <Card
            className="bg-white cursor-pointer transition-all duration-200 transform hover:scale-105 shadow-lg border-2 border-gray-200"
            onClick={handleCheckOut}
          >
            <div className="p-6 flex flex-col items-center justify-center text-center h-40">
              <div className="bg-red-100 p-3 rounded-full mb-3">
                <ThumbsDown className="h-8 w-8 text-red-600" />
              </div>
              <p className="font-semibold text-gray-700">Check-Out</p>
            </div>
          </Card>

          {/* Request Check-in */}
          <Card
            className="bg-white cursor-pointer transition-all duration-200 transform hover:scale-105 shadow-lg border-2 border-gray-200"
            onClick={handleRequestCheckIn}
          >
            <div className="p-6 flex flex-col items-center justify-center text-center h-40">
              <div className="bg-gray-100 p-3 rounded-full mb-3">
                <Clock className="h-8 w-8 text-gray-600" />
              </div>
              <p className="font-semibold text-gray-700 text-sm">Request Check-In</p>
            </div>
          </Card>

          {/* No attendance Report */}
          <Card
            className="bg-white cursor-pointer transition-all duration-200 transform hover:scale-105 shadow-lg border-2 border-gray-200"
            onClick={handleNoAttendance}
          >
            <div className="p-6 flex flex-col items-center justify-center text-center h-40">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <p className="font-semibold text-gray-700 text-sm">No attendance Report</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Atendimento;
