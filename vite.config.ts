import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': Object.keys(process.env).reduce(
      (accumulator: any, key: string) => {
        if (key.startsWith('VITE_')) {
          accumulator[key] = process.env[key]
        }
        return accumulator
      },
      {
        TOKEN: process.env.TOKEN
      }
    )
  }
})
