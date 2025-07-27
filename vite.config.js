import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any path aliases here if needed
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
    esbuildOptions: {
      // Enable esbuild's tree shaking
      treeShaking: true,
    },
  },
  build: {
    target: 'esnext', // Leverage modern browser features
    minify: 'terser', // Enable minification
    sourcemap: true, // Generate source maps for better debugging
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          react: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
  server: {
    port: 5173, // Ensure consistent port
    open: true, // Open browser on server start
  },
  // Add environment variables if needed
  define: {
    'process.env': {}
  },
});
