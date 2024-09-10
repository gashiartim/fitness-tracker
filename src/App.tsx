import { Header } from "@/components/layout/Header";
import AppRoutes from "@/Routes";
import { AuthProvider } from "./components/AuthProvider";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./lib/supabase-client";
import { supabaseConfig } from "./lib/supabase-config";

function App() {
  console.log(supabaseConfig);
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <AuthProvider>
        <Header />
        <AppRoutes />
      </AuthProvider>
    </SessionContextProvider>
  );
}

export default App;
