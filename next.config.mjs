/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The existing portfolio uses client-side auth/CMS APIs.
  // Keep the app as a single Next.js shell while preserving all existing routes.
};
export default nextConfig;
