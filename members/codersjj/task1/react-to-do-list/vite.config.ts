import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//@ts-ignore
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // setting up path alias, see: https://medium.com/@vitor.vicen.te/setting-up-path-aliases-in-a-vite-typescript-react-project-the-ultimate-way-d2a9a8ff7c63
      //@ts-ignore
      '@': path.resolve(__dirname, './src')
    }
  }
})
