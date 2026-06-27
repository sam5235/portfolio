import {
  siReact,
  siNextdotjs,
  siVuedotjs,
  siNuxt,
  siTypescript,
  siJavascript,
  siRedux,
  siTailwindcss,
  siClaude,
  siGooglegemini,
  siLangchain,
  siBootstrap,
  siFirebase,
  siDotnet,
  siChartdotjs,
  siFigma,
  siGit,
  siGithub,
  siVite,
  type SimpleIcon,
} from 'simple-icons'

// Resolve a tech slug (from content/<lng>/tech.json) to its SVG path + brand
// color. Only the icons referenced here are bundled (tree-shaken).
const icons: Record<string, SimpleIcon> = {
  react: siReact,
  nextdotjs: siNextdotjs,
  vuedotjs: siVuedotjs,
  nuxt: siNuxt,
  typescript: siTypescript,
  javascript: siJavascript,
  redux: siRedux,
  tailwindcss: siTailwindcss,
  claude: siClaude,
  googlegemini: siGooglegemini,
  langchain: siLangchain,
  bootstrap: siBootstrap,
  firebase: siFirebase,
  dotnet: siDotnet,
  chartdotjs: siChartdotjs,
  figma: siFigma,
  git: siGit,
  github: siGithub,
  vite: siVite,
}

export type ResolvedTechIcon = {
  name: string
  path: string
  brand: string
}

export function resolveTechIcon(
  slug: string,
  name: string,
): ResolvedTechIcon | null {
  const icon = icons[slug]
  if (!icon) return null
  return { name, path: icon.path, brand: `#${icon.hex}` }
}
