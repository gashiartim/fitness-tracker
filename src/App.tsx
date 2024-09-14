import React, { useEffect } from "react";

import { Header } from "@/components/layout/Header";
import AppRoutes from "@/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "@/hooks/useTheme";
import LoadingScreen from "@/components/LoadingScreen";

import { useAuth } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  const { theme } = useTheme();
  const { loading } = useAuth();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen text-black bg-white dark:bg-gray-900 dark:text-white">
        <Header />
        <AppRoutes />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default function AppWrapper() {
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.Suspense>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false } as { hasError: boolean };
  }

  static getDerivedStateFromError(error: Error) {
    console.log("Error:", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
