import "./globals.css";

export const metadata = {
  title: "Ovejite | Google Ads & Performance Marketing Specialist",
  description: "Google Ads and performance marketing specialist helping businesses grow through paid advertising, conversion tracking, GA4, GTM, and CRO.",
  metadataBase: new URL("https://www.ovejite.me"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
