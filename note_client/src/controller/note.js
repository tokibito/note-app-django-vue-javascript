import { Page } from '../model/page'
import { RestApi } from '../util/rest-api'

class NoteController {
  constructor(apiUrl) {
    this.pageApi = new RestApi(apiUrl.NotePage, Page)
    this.pages = []
    this.selectedPage = null
  }

  ready() {
    console.log('NoteController ready.')
    this.load()
  }

  load() {
    this.pageApi.list()
    .then((instances) => {
      this.pages = instances
    })
  }

  selectPage(page) {
    this.selectedPage = page;
  }

  save() {
  }
}

export {
  NoteController
}
