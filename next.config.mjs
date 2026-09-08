/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  pageExtensions: [
    "page.js",
    "page.jsx",
    "page.ts",
    "page.tsx",
    "layout.js",
    "layout.jsx",
    "layout.ts",
    "layout.tsx",
  ],
};

export default nextConfig;
