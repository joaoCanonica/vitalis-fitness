import { defineConfig } from 'vite'

export default defineConfig({
  root: 'client',
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      '3000-ixb2kzno6zlq01hg7trk3-86c070d0.us2.manus.computer',
      'vitalisfit-aqufrh8m.manus.space',
      'localhost',
      '127.0.0.1'
    ]
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  preview: {
    host: '0.0.0.0',
    port: 3000
  }
})
