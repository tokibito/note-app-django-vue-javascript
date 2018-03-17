import { Page } from '../model/page'
import { RestApi } from '../util/rest-api'

class NoteController {
  constructor(apiUrl) {
    this.pageApi = new RestApi(apiUrl.NotePage, Page)
    this.pages = []
    this.selectedPage = null
    this.loaded = false
  }

  ready() {
    console.log('NoteController ready.')
    this.load()
  }

  load() {
    this.pageApi.list()
    .then((instances) => {
      this.pages = instances
      this.loaded = true
    })
  }

  selectPage(page) {
    if (this.selectedPage && this.selectedPage.taint) {
      return [false, "変更が保存されていません。"]
    }
    this.selectedPage = page
    return [true, null]
  }

  save(csrfToken=null) {
    if (!this.selectedPage.title || !this.selectedPage.content) {
      return [false, "タイトルと内容は必須です。", null]
    }
    let promise = this.pageApi.save(this.selectedPage, csrfToken)
    .then((instance) => {
      Object.assign(this.selectedPage, instance)
    })
    return [true, "保存しています...", promise]
  }

  revert() {
    if (this.selectedPage) {
      this.selectedPage.revert()
    }
  }

  destroy(csrfToken=null) {
    if (this.selectedPage.id == null) {
      this.pages.pop()
      this.selectedPage = null
      return [true, null, null]
    }
    let promise = this.pageApi.destroy(this.selectedPage, csrfToken)
    .then(() => {
      this.selectedPage = null
      this.load()
    })
    return [true, "削除しています...", promise]
  }

  create(csrfToken=null) {
    if (this.selectedPage && this.selectedPage.taint) {
      return
    }
    let page = new Page
    page.taint = true
    this.pages.push(page)
    this.selectedPage = page
  }
}

export {
  NoteController
}
