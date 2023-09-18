enum CacheMode {
  CacheFirst,
  NetworkFirst,
  NetworkOnly,
}

interface CacheKey {
  CacheMode: CacheMode
  CacheKey: String | null
}

export { CacheMode }

export type { CacheKey }
