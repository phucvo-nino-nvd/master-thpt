/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		// Grading waits on the LLM, longer than the 30s default.
		proxyTimeout: 10 * 60 * 1000,
	},
	async rewrites() {
		const target = (process.env.API_PROXY_TARGET || '').replace(/\/$/, '').replace(/\/api$/, '');
		if (!target) {
			throw new Error('API_PROXY_TARGET is not configured.');
		}
		return [{ source: '/api/:path*', destination: `${target}/api/:path*` }];
	},
};

export default nextConfig;
