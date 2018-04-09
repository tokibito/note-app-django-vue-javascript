import axios from 'axios'

/*
 * REST APIクライントのラッパー
 * API呼び出しの結果からモデルのインスタンスを生成します
 */
class RestApi {
  constructor(endpoint, model) {
    this.endpoint = endpoint
    this.model = model
  }

  list(options={}) {
    return new Promise((resolve, reject) => {
      axios.get(this.endpoint, options)
      .then((response) => {
        resolve(response.data.map(this.model.fromData))
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  }

  create(instance, csrfToken=null, options={}) {
    let sendOptions = {}
    Object.assign(sendOptions, options, {
      headers: {'X-CSRFToken': csrfToken}
    })
    return new Promise((resolve, reject) => {
      axios.post(
        this.endpoint,
        instance.toData(),
        sendOptions
      )
      .then((response) => {
        resolve(this.model.fromData(response.data))
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  }

  update(instance, csrfToken=null, options={}) {
    let sendOptions = {}
    Object.assign(sendOptions, options, {
      headers: {'X-CSRFToken': csrfToken}
    })
    return new Promise((resolve, reject) => {
      axios.put(
        this.endpoint + `${instance.id}/`,
        instance.toData(),
        sendOptions
      )
      .then((response) => {
        resolve(this.model.fromData(response.data))
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  }

  save(instance, csrfToken=null, options={}) {
    // idがない場合は新規、あれば更新
    if (instance.id == null) {
      return this.create(instance, csrfToken, options)
    } else {
      return this.update(instance, csrfToken, options)
    }
  }

  destroy(instance, csrfToken=null) {
    return new Promise((resolve, reject) => {
      axios.delete(
        this.endpoint + `${instance.id}/`,
        {
          headers: {'X-CSRFToken': csrfToken}
        })
      .then(() => {
        resolve()
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  }
}

export {
  RestApi
}
