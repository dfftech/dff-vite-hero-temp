import React from "react";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggled, setToggled] = React.useState(true);

  React.useEffect(() => {
    console.log("toggled :: ", toggled);
  }, [toggled]);

  return (
    <>
      <div className="relative flex flex-col h-screen overflow-hidden">
        <Navbar onToggle={() => setToggled(!toggled)} />
        <main className="container mx-auto max-w-7xl px-6 flex-grow">
          <div className="flex gap-4">
            <Sidebar isOpen={toggled} onToggle={() => setToggled(!toggled)} />
            <div className="flex-grow">{children}</div>
          </div>
        </main>
        {/* <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://heroui.com"
            title="heroui.com homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">HeroUI</p>
          </Link>
        </footer> */}
      </div>
    </>
  );
}
