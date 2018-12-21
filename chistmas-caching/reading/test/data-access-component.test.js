const assert = require('assert')
const { spy } = require('sinon')
const XKCDClient = require('../src/data-access-component')

suite('Data Access Component', () => {
    suite('buildXKCDComicsURL', () => {
        spec('builds last comic URL with no params', () => {
            const xkcdClient = new XKCDClient()
            const result = xkcdClient.buildXKCDComicsURL()

            assert.ok(result instanceof URL, 'result not an instance of URL')
            assert.ok(result.pathname.includes('info.0.json'), 'missing `info.0.json` fragment')
            assert.ok(!(/\d{2,}/.test(result.pathname)), 'result includes more than a number')
        })

        spec('builds last comic URL with zero param', () => {
            const xkcdClient = new XKCDClient()
            const result = xkcdClient.buildXKCDComicsURL(0)

            assert.ok(result instanceof URL, 'result not an instance of URL')
            assert.ok(result.pathname.includes('info.0.json'), 'missing `info.0.json` fragment')
            assert.ok(!(/\d{2,}/.test(result.pathname)), 'result includes more than a number')
        })

        spec('builds #number comic with #number param', () => {
            const number = 120
            const xkcdClient = new XKCDClient()

            const result = xkcdClient.buildXKCDComicsURL(number)

            assert.ok(result instanceof URL, 'result not an instance of URL')
            assert.ok(result.pathname.includes('info.0.json'), 'missing `info.0.json` fragment')
            assert.ok(result.pathname.includes(number), 'result does not include number')
        })
    })

    suite('httpGet', () => {
        spec('calls httpClient', () => {
            const urlString = 'http://www.google.com/'
            const httpClientSpy = spy(async () => ({ body: 'whatever' }))
            const xkcdClient = new XKCDClient(httpClientSpy)

            xkcdClient.httpGet(new URL(urlString))

            assert.ok(httpClientSpy.called)
            assert.deepEqual(httpClientSpy.args[0][0], { url: urlString, parse: 'json' })
        })

        spec('returns body', async () => {
            const urlString = 'http://www.google.com/'
            const body = { foo: 'bar' }
            const httpClientSpy = spy(async () => ({ body }))
            const xkcdClient = new XKCDClient(httpClientSpy)

            const result = await xkcdClient.httpGet(new URL(urlString))

            assert.deepEqual(result, body)
        })
    })

    suite('getLastComics', () => {
        spec('returns a list of right length', async () => {
            const length = 10

            const httpClientSpy = spy(async () => ({ body: new Date() }))

            const xkcdClient = new XKCDClient(httpClientSpy)
            const result = await xkcdClient.getLastComics(length)

            assert.equal(result.length, length)
        })
    })
})