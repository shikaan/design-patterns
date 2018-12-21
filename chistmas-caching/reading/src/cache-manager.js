const CACHE_LAYER = new Map()

class CacheManager {
    /**
     * Gets cached entry associated with key, Returns null if missing.
     * 
     * @param {string} key 
     * @returns {any|null}
     */
    get(key) {
        if (!CACHE_LAYER.has(key)) {
            return null
        }

        return CACHE_LAYER.get(key)
    }

    /**
     * Saves a key in cache
     * 
     * @param {string} key 
     * @param {any} entry 
     * @param {number} [expiration=0] - in seconds 
     */
    set(key, entry, expiration = 0) {
        if (!key) {
            throw new RangeError(`Cannot set entry without a key. Expected a key, got ${key}`)
        }

        CACHE_LAYER.set(key, entry)

        if (expiration) {
            setTimeout(() => {
                CACHE_LAYER.delete(key)
            }, expiration * 1000)
        }
    }
}

module.exports = CacheManager