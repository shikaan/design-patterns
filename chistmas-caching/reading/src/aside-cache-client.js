const XKCDClient = require('./data-access-component')
const CacheManager = require('./cache-manager')

class Application {
    constructor() {
        this.cacheManager = new CacheManager()
        this.xkcdClient = new XKCDClient()
    }

    async main() {
        console.log(`Getting last 5 XKCD comics from XKCD API...`)
        console.time('XKCD API')

        const result = await this.xkcdClient.getLastComics(5)
        this.cacheManager.set(5, result)

        console.timeEnd('XKCD API')

        console.log('Result:\n', result)

        console.log('Getting last 2 XKCD comics using Cache...')
        console.time('Cache')

        const newResult = (await this.cacheManager.get(5)).slice(0, 2)

        console.timeEnd('Cache')

        console.log('Result:\n', newResult)
    }
}


(new Application()).main()
