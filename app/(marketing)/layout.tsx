import React from "react";
import { Navbar } from "./_components/Navbar";
import { Footer } from "./_components/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
