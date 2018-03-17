import { Page } from '../model/page'
import { RestApi } from '../util/rest-api'

/*
 * コントローラ
 * データも保持しているので、ViewModelとしても使っています
 */
class NoteController {
  constructor(apiUrl) {
    // RestApiインスタンスの生成は呼び出し元に置くか悩みましたが、
    // 依存していてもさほど問題なさそうなのでここで呼んでいます
    this.pageApi = new RestApi(apiUrl.NotePage, Page)
    this.pages = []
    this.selectedPage = null
    this.loaded = false
  }

  /*
   * エントリポイントからロード完了時に呼ばれるメソッド
   */
  ready() {
    this.load()
  }

  /*
   * ページ一覧の取得
   */
  load() {
    this.pageApi.list()
    .then((instances) => {
      this.pages = instances
      this.loaded = true
    })
  }

  /*
   * ページを選択する
   */
  selectPage(page) {
    if (this.selectedPage && this.selectedPage.taint) {
      return [false, "変更が保存されていません。"]
    }
    this.selectedPage = page
    return [true, null]
  }

  /*
   * 現在のページを保存する
   */
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

  /*
   * 変更を破棄する
   */
  revert() {
    if (this.selectedPage) {
      this.selectedPage.revert()
    }
  }

  /*
   * 現在のページを削除する
   */
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

  /*
   * 新規ページを作る
   * バックエンドへの保存はしません
   */
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
