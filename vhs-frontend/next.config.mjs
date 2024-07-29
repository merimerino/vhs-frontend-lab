/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return [
      { source: '/api/:path*', destination: 'https://academy-backend.sofascore.dev/:path*' }
    ];
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
