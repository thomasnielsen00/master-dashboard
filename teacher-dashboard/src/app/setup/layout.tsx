export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <main>{children}</main>
    </>
  );
}
