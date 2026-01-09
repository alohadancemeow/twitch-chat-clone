/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Ignore ESLint errors during `next build` so CI/container builds don't fail
        // while still allowing developers to see linting locally.
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
