import QuoteBottomNav from "./components/QuoteBottomNav";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <QuoteBottomNav />
    </>
  );
}