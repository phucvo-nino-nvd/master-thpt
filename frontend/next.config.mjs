const nextConfig = {
	reactStrictMode: true,
	env: {
		MOCK_ACCOUNT: process.env.MOCK_ACCOUNT ?? 'False',
	},
	experimental: {
		proxyTimeout: 10 * 60 * 1000,
	},
	async redirects() {
		return [{ source: '/knowledge_graph', destination: '/learning_path', permanent: true }];
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
