/*
 * controller/note.jsのテスト
 */
import * as assert from 'power-assert'
import sinon from 'sinon'

import { NoteController } from 'controller/note'
import { Page } from 'model/page'

describe('NoteController', () => {
  it('ready', () => {
    let target = new NoteController('/foo/bar/')
    let loadMock = sinon.spy()
    target.load = loadMock
    target.ready()
    assert(loadMock.called, "load()が呼ばれること")
  })

  it('load', () => {
    let target = new NoteController('/foo/bar/')
    // list()を挿し替える
    target.pageApi.list = () => {
      return new Promise((resolve, reject) => {
        resolve('testLoaded')
        assert(target.loaded, "ロード済みになる")
        assert.equal('testLoaded', target.pages, "pagesに結果が保持される")
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    }
    assert(!target.loaded, "最初は未ロード")
    target.load()
  })

  describe('selectPage', () => {
    it('change page', () => {
      let target = new NoteController('/foo/bar/')
      let pageCurrent = new Page(1)
      let pageNext = new Page(2)
      target.selectedPage = pageCurrent
      let result, message
      [result, message] = target.selectPage(pageNext)
      assert(result, 'ページを変更できる')
      assert.equal(2, target.selectedPage.id, 'id=2のページになる')
    })

    it('current page is taint', () => {
      let target = new NoteController('/foo/bar/')
      let pageCurrent = new Page(1)
      pageCurrent.taint = true
      let pageNext = new Page(2)
      target.selectedPage = pageCurrent
      let result, message
      [result, message] = target.selectPage(pageNext)
      assert(!result, 'taint状態の場合はページを変更できない')
      assert.equal(1, target.selectedPage.id, 'id=1のページのまま')
    })
  })

  describe('save', () => {
    it('success saving', () => {
      let target = new NoteController('/foo/bar/')
      let pageCurrent = new Page()
      pageCurrent.title = "testTitle"
      pageCurrent.content = "testContent"
      target.selectedPage = pageCurrent
      // 保存した場合はid付きのオブジェクトがAPIから返される想定
      let pageSaved = new Page(1, "testTitle", "testContent")
      // save()を挿し替える
      target.pageApi.save = (page, csrfToken) => {
        return new Promise((resolve, reject) => {
          resolve(pageSaved)
          assert.equal(1, target.selectedPage.id, "idが更新される")
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
      }
      assert.equal(null, target.selectedPage.id, "保存前はIDがnull")
      let result, message, promise
      [result, message, promise] = target.save()
      assert(result, "保存の呼び出しに成功する")
    })

    it('title is empty', () => {
      let target = new NoteController('/foo/bar/')
      let pageCurrent = new Page()
      pageCurrent.title = ""
      pageCurrent.content = "testContent"
      target.selectedPage = pageCurrent
      let result, message, promise
      [result, message, promise] = target.save()
      assert(!result, "保存できないこと")
    })

    it('content is empty', () => {
      let target = new NoteController('/foo/bar/')
      let pageCurrent = new Page()
      pageCurrent.title = "testTitle"
      pageCurrent.content = ""
      target.selectedPage = pageCurrent
      let result, message, promise
      [result, message, promise] = target.save()
      assert(!result, "保存できないこと")
    })
  })
})
