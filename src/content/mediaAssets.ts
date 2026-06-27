// Resolve project media (images + videos) kept in src/assets/projects/ to
// hashed, build-optimized URLs. JSON references files by their plain filename;
// this maps that name to the emitted asset URL. Unknown names resolve to
// undefined so missing files surface as gaps rather than broken 404s.
const files = import.meta.glob('../assets/projects/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const byName = new Map<string, string>()
for (const [path, url] of Object.entries(files)) {
  const name = path.split('/').pop()
  if (name) byName.set(name, url)
}

export function resolveAsset(name?: string): string | undefined {
  if (!name) return undefined
  return byName.get(name)
}
