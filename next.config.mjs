/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    KITS_VOICE_API_KEY: process.env.KITS_VOICE_API_KEY
  }
};

export default nextConfig;
