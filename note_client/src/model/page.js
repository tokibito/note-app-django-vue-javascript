class Page {
  constructor(
      id=null, title='', content='', createdAt=null,
      updatedAt=null, taint=false) {
    this.id = id
    this._title = title
    this._content = content
    this.createdAt = createdAt
    this.updatedAt = createdAt
    this.taint = taint
    this.origin = null
  }

  static fromData(data) {
    let instance = new Page(
      data.id || null,
      data.title || null,
      data.content || '',
      data.created_at || null,
      data.updated_at || null
    )
    instance.origin = data
    return instance
  }

  toData() {
    return {
      id: this.id,
      title: this._title,
      content: this._content
    }
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

  revert() {
    if (this.origin == null) {
      this._title = ''
      this._content = ''
    } else {
      this._title = this.origin.title
      this._content = this.origin.content
    }
    this.taint = false
  }
}

export {
  Page
}
