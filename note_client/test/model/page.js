import * as assert from 'power-assert'
import { Page } from 'model/page'

describe('Page:fromData', () => {
  it('one', () => {
    var result = Page.fromData({
      id: 123,
      title: 'テストタイトル',
      content: 'テスト本文'
    })
    assert.equal(result.id, 123)
    assert.equal(result.title, 'テストタイトル')
    assert.equal(result.content, 'テスト本文')
  })
})
