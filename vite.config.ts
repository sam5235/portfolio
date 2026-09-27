import { rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// Contact-free build (VITE_HIDE_CONTACT=true): blank contact fields in every
// locale's profile.json before bundling, so the email/CV/Calendly/Formspree
// values and non-Upwork socials never ship, and drop the CV + sitemap from the
// output. The UI hides the matching sections via src/config/site.ts.
function stripContact(): Plugin {
  let outDir = 'dist'
  return {
    name: 'strip-contact',
    enforce: 'pre',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    transform(code, id) {
      if (!/[\\/]src[\\/]content[\\/][^\\/]+[\\/]profile\.json$/.test(id.split('?')[0])) return
      const profile = JSON.parse(code)
      Object.assign(profile, { email: '', cvUrl: '', calendlyUrl: '', formspreeEndpoint: '' })
      profile.socials = profile.socials.filter((s: { icon: string }) => s.icon === 'upwork')
      profile.seo.twitter = ''
      return { code: JSON.stringify(profile), map: null }
    },
    closeBundle() {
      rmSync(resolve(outDir, 'cv.pdf'), { force: true })
      rmSync(resolve(outDir, 'sitemap.xml'), { force: true })
      writeFileSync(resolve(outDir, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [
      env.VITE_HIDE_CONTACT === 'true' && stripContact(),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
    ],
    server: {
      host: true,
      port: 5173,
      strictPort: true,
    },
  }
})
