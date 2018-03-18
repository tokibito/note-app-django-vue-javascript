/*
 * model/page.jsのテスト
 */
import * as assert from 'power-assert'
import { Page } from 'model/page'

describe('Page', () => {
  it('fromData', () => {
    let result = Page.fromData({
      id: 123,
      title: 'テストタイトル',
      content: 'テスト本文'
    })
    assert.equal(123, result.id)
    assert.equal('テストタイトル', result.title)
    assert.equal('テスト本文', result.content)
  })

  it('toData', () => {
    let target = new Page(123, 'テストタイトル', 'テスト本文')
    let result = target.toData()
    assert.equal(123, result.id)
    assert.equal('テストタイトル', result.title)
    assert.equal('テスト本文', result.content)
  })

  it('set title:taint', () => {
    let target = new Page(123, 'テストタイトル', 'テスト本文')
    assert(!target.taint, '作成時は未変更')
    target.title = 'タイトル変更'
    assert(target.taint, 'タイトル変更後は変更')
  })

  it('set content:taint', () => {
    let target = new Page(123, 'テストタイトル', 'テスト本文')
    assert(!target.taint, '作成時は未変更')
    target.content = '本文変更'
    assert(target.taint, '本文変更後は変更')
  })

  it('revert', () => {
    let target = new Page(123, 'テストタイトル', 'テスト本文')
    target.origin = {
      title: target.title,
      content: target.content
    }
    target.title = 'タイトル変更'
    target.content = '本文変更'
    assert.equal(target.title, 'タイトル変更', '変更は保持されている')
    assert.equal(target.content, '本文変更', '変更は保持されている')
    target.revert()
    assert.equal(target.title, 'テストタイトル', '変更前に戻る')
    assert.equal(target.content, 'テスト本文', '変更前に戻る')
  })
})
