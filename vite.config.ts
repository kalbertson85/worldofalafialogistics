import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // This ensures that the app works both locally and on GitHub Pages
    base: env.NODE_ENV === 'production' ? '/worldofalafialogistics/' : '/',
    
    server: {
      host: '::',
      port: 8080,
      strictPort: true,
    },
    
    plugins: [react()],
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', 'framer-motion'],
          },
        },
      },
    },
    
    preview: {
      port: 8080,
      strictPort: true,
    },
  };
});
