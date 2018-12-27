const assert = require('assert')
const { spy } = require('sinon')

const ResourceManager = require('../src/resource-manager')

const getCacheManagerStub = () => {
    return {
        get: spy(),
        set: spy()
    } 
}

const getXKCDClientStub = () => {
    return {
        getLastComics: spy()
    } 
}

suite('Resource Manager', () => {
    suite('getLastComics', () => {
        spec('fetch entries from XKCDClient if resource is not cached', async () => {
            const cacheManagerStub = getCacheManagerStub() 
            const xkcdClientStub = getXKCDClientStub() 
            const resourceManager = new ResourceManager(cacheManagerStub, xkcdClientStub)

            await resourceManager.getLastComics(1)

            assert.ok(cacheManagerStub.get.called)
            assert.ok(cacheManagerStub.set.called)
            assert.ok(xkcdClientStub.getLastComics.called)
        })

        spec('fetch entries from CacheManager if resource is cached',() => {
            const cacheManagerStub = getCacheManagerStub()
            cacheManagerStub.get = spy(() => 'not-null')

            const xkcdClientStub = getXKCDClientStub() 
            const resourceManager = new ResourceManager(cacheManagerStub, xkcdClientStub)

            resourceManager.getLastComics(1)

            assert.ok(cacheManagerStub.get.called)
            assert.ok(!cacheManagerStub.set.called)
            assert.ok(!xkcdClientStub.getLastComics.called)
        })
    })
})
