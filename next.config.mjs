/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /*
   * This project uses src/pages for the existing React application.
   * Do not let Next.js treat those .jsx files as Next.js Pages Router routes.
   */
  pageExtensions: ["page.js", "page.jsx", "page.ts", "page.tsx"],
};

export default nextConfig;
