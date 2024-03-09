export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex-col items-center md:flex-row shadow-md bg-white rounded-md flex w-[800px] max-w-2xl h-[600px]">
        <div className="w-full md:w-1/3 pr-2 flex items-center justify-center border-r bg-blue-400 h-[100px] md:h-[600px]"></div>

        <div className="w-2/3 flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
