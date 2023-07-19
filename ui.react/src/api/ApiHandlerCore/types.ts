enum CacheMode {
  CacheFirst,
  NetworkFirst,
}

interface CacheKey {
  CacheMode: CacheMode,
  CacheKey: String
}

export {
  CacheMode,
}

export type {
  CacheKey,
}
