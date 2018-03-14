class Page {
  constructor(
      id=null, title='', content=null, createdAt=null,
      updatedAt=null) {
    this.id = id
    this.title = title
    this.content = content
    this.createdAt = createdAt
    this.updatedAt = createdAt
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
      title: this.title,
      content: this.content
    }
  }
}

export {
  Page
}
