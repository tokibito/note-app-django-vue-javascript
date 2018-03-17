/*
 * util/url-builder.jsのテスト
 */
import * as assert from 'power-assert'
import { UrlBuilder } from 'util/url-builder'

describe('UrlBuilder', () => {
  it('build', () => {
    let target = new UrlBuilder({
      TestPath: '/foo/bar/'
    })
    let result = target.build()
    assert.equal('/foo/bar/', result.TestPath)
  })
  it('build with prefix', () => {
    let target = new UrlBuilder({
      TestPath: '/foo/bar/'
    }, 'https://example.com')
    let result = target.build()
    assert.equal('https://example.com/foo/bar/', result.TestPath)
  })
})
