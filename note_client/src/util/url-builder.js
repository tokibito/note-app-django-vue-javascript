/*
 * APIのパス定義にprefixをつけるクラス
 */
class UrlBuilder {
  constructor(urls, prefix=null) {
    this.urls = urls
    this.prefix = prefix || ''
  }

  build() {
    let result = {};
    for(let key of Object.keys(this.urls)) {
      result[key] = this.prefix + this.urls[key]
    }
    return result
  }
}

export {
  UrlBuilder
}
