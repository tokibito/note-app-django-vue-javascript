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
      return
    }
    this.selectedPage = page
  }

  save(csrfToken=null) {
    if (!this.selectedPage.title || !this.selectedPage.content) {
      return false
    }
    this.pageApi.save(this.selectedPage, csrfToken)
    .then((instance) => {
      Object.assign(this.selectedPage, instance)
    })
    return true
  }

  destroy(csrfToken=null) {
    if (this.selectedPage.id == null) {
      this.pages.pop()
      this.selectedPage = null
      return
    }
    this.pageApi.destroy(this.selectedPage, csrfToken)
    .then(() => {
      this.selectedPage = null
      this.load()
    })
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
