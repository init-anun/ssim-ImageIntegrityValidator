import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {


  const env = loadEnv('', process.cwd(), '')
  // console.log('Environment variables:', env.VITE_DEBUG, env.VITE_API_URL)


  return {
    plugins: [react()],
    server: {
      ...(env.VITE_DEBUG === 'true' && {
        proxy: {
          '/api/v1': {
            target: env.VITE_API_URL,
            changeOrigin: true,
            secure: false,
          },
        },
      }),
    }

  }

})
