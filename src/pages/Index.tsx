import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import Auth from "./Auth";

const Index = () => {
  const location = useLocation();
  
  if (location.pathname === "/auth") {
    return <Auth />;
  }
  
  return <Dashboard />;
};

export default Index;
