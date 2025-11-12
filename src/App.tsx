import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NovoCadastro from "./pages/NovoCadastro";
import Cadastrados from "./pages/Cadastrados";
import DetalhesCadastro from "./pages/DetalhesCadastro";
import TestePage from "./pages/TestePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Index />} />
          {/* Rota de cadastro público removida - apenas via Supabase */}
          <Route path="/cadastrados" element={<Cadastrados />} />
          <Route path="/cadastrado/:id" element={<DetalhesCadastro />} />
          <Route path="/detalhes-cadastro/:id" element={<DetalhesCadastro />} />
          <Route path="/novo-cadastro" element={<NovoCadastro />} />
          <Route path="/editar-cadastro/:id" element={<NovoCadastro />} />
          <Route path="/teste" element={<TestePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
