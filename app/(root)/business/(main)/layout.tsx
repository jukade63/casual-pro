import BasicInfo from "@/components/BasicInfo";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-rose-100 min-h-screen">
      <div className="bg-slate-100 px-2 md:px-5 max-w-4xl mx-auto min-h-screen">
        <div className="p-2 md:px-5 md:py-4 max-w-3xl mx-auto pb-10 space-y-2">
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
