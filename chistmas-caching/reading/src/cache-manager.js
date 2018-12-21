const STORE = new Map()

class CacheManager {
    /**
     * Gets cached entry associated with key, Returns null if missing.
     * 
     * @param {string} key 
     * @returns {any|null}
     */
    get(key) {
        if (!STORE.has(key)) {
            return null
        }

        return STORE.get(key)
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

        STORE.set(key, entry)

        if (expiration) {
            setTimeout(() => {
                STORE.delete(key)
            }, expiration * 1000)
        }
    }
}

module.exports = CacheManager