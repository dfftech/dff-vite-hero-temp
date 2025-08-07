import React from "react";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-full relative">{children}</div>;
};
