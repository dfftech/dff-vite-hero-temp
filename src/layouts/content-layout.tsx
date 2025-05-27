export const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-grow border border-gray-400 rounded-lg mb-4 p-4 mx-auto min-w-[360px] overflow-y-auto h-[calc(100vh-169px)]">
      {children}
    </main>
  );
};
