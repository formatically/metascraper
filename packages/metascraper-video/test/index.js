'use strict'

const snapshot = require('snap-shot')
const { promisify } = require('util')
const { resolve } = require('path')
const { omit } = require('lodash')
const fs = require('fs')

const metascraper = require('metascraper').load([
  require('metascraper-video')(),
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-lang')(),
  require('metascraper-logo')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
])

const readFile = promisify(fs.readFile)

describe('metascraper-video', () => {
  describe('video', () => {
    it('video src', async () => {
      const html = await readFile(resolve(__dirname, 'fixtures/video-src.html'))
      const url = 'https://www.theverge.com/2018/1/22/16921092/pentagon-secret-nuclear-bunker-reconstruction-minecraft-cns-miis-model'

      const metadata = await metascraper({ html, url })
      snapshot(metadata)
    })

    it('source src', async () => {
      const html = await readFile(resolve(__dirname, 'fixtures/source-src.html'))
      const url = 'https://9gag.com/gag/aGjVLDK'

      const metadata = await metascraper({ html, url })
      snapshot(metadata)
    })

    it('og:video', async () => {
      const html = await readFile(resolve(__dirname, 'fixtures/tweet.html'))
      const url = 'https://twitter.com/_developit/status/955905369242513414'

      const metadata = await metascraper({ html, url })
      snapshot(metadata)
    })

    describe('specific providers', () => {
      it('clips.twitch.tv', async () => {
        const html = await readFile(resolve(__dirname, 'fixtures/providers/clip.twitch.tv.html'))
        const url = 'https://clips.twitch.tv/AwkwardBoredWaffleItsBoshyTime'
        const metadata = await metascraper({ html, url })
        snapshot(metadata)
      })

      it('play.tv', async () => {
        const html = await readFile(resolve(__dirname, 'fixtures/providers/play.tv.html'))
        const url = 'https://plays.tv/video/5a6f64b1bef69a7fa9/holy-shit'
        const metadata = await metascraper({ html, url })
        snapshot(omit(metadata, ['date']))
      })
    })
  })

  describe('image', () => {
    it('src:poster', async () => {
      const html = await readFile(resolve(__dirname, 'fixtures/source-poster.html'))
      const url = 'https://gfycat.com/gifs/detail/timelyhealthyarmadillo'
      const metadata = await metascraper({ html, url })
      snapshot(metadata)
    })
  })
})
