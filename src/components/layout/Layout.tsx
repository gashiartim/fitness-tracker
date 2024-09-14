import { ReactNode, type FC } from "react";
import { Header } from "./Header";
import { Toaster } from "@/components/ui/toaster";


type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Toaster />
    </div>
  );
};
