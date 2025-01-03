class LocalCache {
  setCache<T>(key: string, value: T): boolean {
    try {
      const str = JSON.stringify(value)
      localStorage.setItem(key, str)
      return true
    } catch (error) {
      console.error('Failed to cache data:', error)
      return false
    }
  }

  getCache(key: string) {
    const value = localStorage.getItem(key)
    if (value === null) return null
    return JSON.parse(value)
  }

  removeCache(key: string) {
    localStorage.removeItem(key)
  }

  clearCache() {
    localStorage.clear()
  }
}

const localCache = new LocalCache()

export default localCache
