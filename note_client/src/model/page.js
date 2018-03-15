class Page {
  constructor(
      id=null, title='', content=null, createdAt=null,
      updatedAt=null, taint=false) {
    this.id = id
    this._title = title
    this._content = content
    this.createdAt = createdAt
    this.updatedAt = createdAt
    this.taint = taint
  }

  static fromData(data) {
    return new Page(
      data.id || null,
      data.title || null,
      data.content || '',
      data.created_at || null,
      data.updated_at || null
    )
  }

  toData() {
    return {
      id: this.id,
      title: this._title,
      content: this._content
    }
  }

  untaint() {
    this.taint = false
  }

  get title() {
    return this._title
  }

  set title(value) {
    this._title = value
    this.taint = true
  }

  get content() {
    return this._content
  }

  set content(value) {
    this._content = value
    this.taint = true
  }
}

export {
  Page
}
