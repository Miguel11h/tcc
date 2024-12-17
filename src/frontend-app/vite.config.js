import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    host: 'localhost',  // Faz o Vite servir no localhost
    port: 5173,         // Ou qualquer outra porta que você preferir
  },
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
