import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'sillytavern-extension/charalog/dist',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/extensionEntry.tsx'),
      formats: ['es'],
      fileName: () => 'charalog-extension.js',
      cssFileName: 'charalog-extension',
    },
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
