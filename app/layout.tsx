import "./globals.css";

export const metadata = {
  title: "Landify",
  description: "The AI Broker for off-market land — discover, enrich, prioritize.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
