class ResourceManager {
    constructor(cacheManager, xkcdClient) {
        this.cacheManager = cacheManager
        this.xkcdClient = xkcdClient
    }
    
    buildCacheKey(numberOfComics) {
        return `${numberOfComics}.LAST_COMICS`
    }

    async getLastComics(amount = 1) {
        const cacheKey = this.buildCacheKey(amount)
        const cacheValue = this.cacheManager.get(cacheKey)
        
        if (cacheValue) {
            return cacheValue
        }

        const result = await this.xkcdClient.getLastComics(amount)
        this.cacheManager.set(cacheKey, result)

        return result
    }
}

module.exports = ResourceManager