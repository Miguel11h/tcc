import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        usuarios: './usuarios.html',
        login: './login.html',
        administrador: './administrador.html'
      }
    }
  }
})
