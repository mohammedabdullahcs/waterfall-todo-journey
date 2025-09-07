import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// Correct base path for GitHub Pages. It must match the repo name exactly and
// SHOULD NOT include 'public' because everything in dist/ is published at
// https://mohammedabdullahcs.github.io/waterfall-todo-journey/ .
export default defineConfig({
  base: '/waterfall-todo-journey/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})