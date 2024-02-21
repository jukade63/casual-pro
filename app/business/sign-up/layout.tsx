
export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="shadow-md bg-white rounded-md flex w-[800px] max-w-2xl">
        <div className="hidden md:flex w-1/2 pr-2 items-center justify-center border-r bg-blue-400">
          
        </div>

        <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
