import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { 
      '@page': path.resolve(__dirname, 'src/pages'),
      '@component': path.resolve(__dirname, 'src/components'),
      '@feature': path.resolve(__dirname, 'src/features'),
      '@hook': path.resolve(__dirname, 'src/hooks'),
      '@interface': path.resolve(__dirname, 'src/interfaces'),
      '@service': path.resolve(__dirname, 'src/services'),
      '@util': path.resolve(__dirname, 'src/utils'),
      '@constant': path.resolve(__dirname, 'src/constants'),
     },
  }
})
