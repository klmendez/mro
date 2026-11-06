import type { NextConfig } from 'next';
const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: process.env.GITHUB_PAGES === 'true' ? '/mro' : undefined,
};
export default config;
