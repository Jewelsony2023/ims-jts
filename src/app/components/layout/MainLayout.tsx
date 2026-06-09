import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      <Sidebar isMenuOpen={isMenuOpen} onCloseMenu={() => setIsMenuOpen(false)} />

      <div className="flex min-h-screen min-w-0 flex-col">
        <Header onToggleMenu={() => setIsMenuOpen((open) => !open)} />

        <main className="min-w-0 flex-1 overflow-x-hidden bg-slate-50 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
