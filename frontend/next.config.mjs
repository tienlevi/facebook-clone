/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'elf' https:; script-src 'elf' https: 'unsafe-inline' 'unsafe-eval'; style-src 'elf' https: 'unsafe-inline'; media-src 'elf' https: http://res.cloudinary.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
