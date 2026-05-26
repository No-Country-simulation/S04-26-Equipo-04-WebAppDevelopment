export default function DiagnosticLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#162840]">
      {children}
    </main>
  );
}
