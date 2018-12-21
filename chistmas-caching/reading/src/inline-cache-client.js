const XKCDClient = require('./data-access-component')
const ResourceManager = require('./resource-manager')
const CacheManager = require('./cache-manager')

class Application {
    constructor() {
        const cacheManager = new CacheManager()
        const xkcdClient = new XKCDClient() 
        this.resourceManager = new ResourceManager(cacheManager, xkcdClient)
    }
    
    
    async main() {
        console.log('Getting last 3 XKCD comics from XKCD API...')
        console.time('XKCD API')

        console.log(await this.resourceManager.getLastComics(3))

        console.timeEnd('XKCD API')

        console.log('Getting last 3 XKCD comics from Cache...')
        console.time('Cache')

        console.log(await this.resourceManager.getLastComics(3))

        console.timeEnd('Cache')
    }
}


(new Application()).main()
