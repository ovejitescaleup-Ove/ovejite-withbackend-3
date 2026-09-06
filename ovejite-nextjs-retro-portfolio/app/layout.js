import "./globals.css";

export const metadata = {
  title: "Ovejite Vhowmick — Google Ads & Performance Marketing",
  description:
    "Ovejite Vhowmick is a Google Ads Team Lead and Performance Marketer focused on scalable, ROI-driven growth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
