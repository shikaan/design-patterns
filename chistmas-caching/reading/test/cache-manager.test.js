const assert = require('assert')
const CacheManager = require('../src/cache-manager')

suite('CacheManager', () => {
    suite('set', () => {
        spec('throws if missing key', () => {
            const cacheManager = new CacheManager()
            assert.throws(() => {
                cacheManager.set(null, 10)
            })
        })

        spec('saves the entry', () => {
            const key = 'key'
            const value = 'value'
            const cacheManager = new CacheManager()
            cacheManager.set(key, value)

            assert.deepEqual(cacheManager.get(key), value)
        })

        spec('saves the entry with expiration', async () => {
            const key = 'key'
            const value = 'value'
            const expiration = 2
            const cacheManager = new CacheManager()
            cacheManager.set(key, value, expiration)

            assert.deepEqual(cacheManager.get(key), value)

            await setTimeout(() => {
                assert.deepEqual(cacheManager.get(key), null)
            }, expiration * 1000)
        })
    })
    
    suite('get', () => {
        spec('returns null if key is not existing', () => {
            const cacheManager = new CacheManager()

            const result = cacheManager.get('idonotexist')

            assert.deepEqual(result, null)
        })
        spec('returns null if key is missing', () => {
            const cacheManager = new CacheManager()

            const result = cacheManager.get()

            assert.deepEqual(result, null)
        })
        spec('returns cached value for key', () => {
            const cacheManager = new CacheManager()
            const key = 'key'
            const value = 'value'
            cacheManager.set(key, value)

            const result = cacheManager.get(key)

            assert.deepEqual(result, value)
        })
    })
})