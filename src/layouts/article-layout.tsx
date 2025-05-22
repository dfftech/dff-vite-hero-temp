export const ArticleLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className=" flex-grow top-0 p-4 max-w-7xl mx-auto min-w-[360px] border border-gray-400 rounded-lg mb-4">
      {children}
    </article>
  );
};
