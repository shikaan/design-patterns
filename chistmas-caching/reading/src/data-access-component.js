const { URL } = require('url')
const p = require('phin')

class XKCDClient {
    constructor(httpClient = p) {
        this.httpClient = httpClient
        this.baseURL = 'https://xkcd.com'
    }

    /**
     * Creates URL object for the XKCD comic identified by the number
     * 
     * @private
     * @param {number} number
     * @returns {URL} 
     */
    buildXKCDComicsURL(number = 0) {
        const path = number > 0 ? `/${number}/info.0.json` : '/info.0.json'
        return new URL(path, this.baseURL)
    }

    /**
     * Performs an HTTP Get call and returns response body
     * 
     * @private
     * @param {URL} url
     * @return {Promise<object>}
     */
    async httpGet(url) {
        const { body } = await this.httpClient({ url: url.href, parse: 'json' })

        return body
    }

    /**
     * Get last issued comic
     * 
     * @private
     * @return {Promise<object>}
     */
    getLastComic() {
        const url = this.buildXKCDComicsURL()

        return this.httpGet(url)
    }

    async getLastComics(amount = 10) {
        const firstRequest = this.getLastComic()
        const { num: firstNumber } = await firstRequest

        const requests = [firstRequest]

        for (let i = 1; i < amount; i++) {
            const url = this.buildXKCDComicsURL(firstNumber - i)

            requests.push(this.httpGet(url))
        }

        return Promise.all(requests)
    }
}

module.exports = XKCDClient