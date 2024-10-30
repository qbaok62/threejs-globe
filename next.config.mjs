/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|frag|vert)$/,
      use: "raw-loader",
    });
    return config;
  },
};

export default nextConfig;
