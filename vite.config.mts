import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
	  allowedHosts: [
	    'a8d9241a6c0348e692ff1a3860ec0838.vfs.cloud9.us-east-1.amazonaws.com',
	    '47f0519e5afd4ba28b322f42a9a35d1d.vfs.cloud9.us-east-1.amazonaws.com'
	    ]
	}
});
