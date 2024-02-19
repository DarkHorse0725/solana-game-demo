/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['arweave.net', 's3.eu-central-1.amazonaws.com', 'deckofcardsapi.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) config.resolve.fallback.fs = false;
    config.module.rules.push(
      {
        test: /\.mp3$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    )
    return config;
  },
}

module.exports = nextConfig
