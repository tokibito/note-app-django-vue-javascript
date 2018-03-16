import axios from 'axios'

class RestApi {
  constructor(endpoint, model) {
    this.endpoint = endpoint;
    this.model = model;
  }

  list() {
    return new Promise((resolve, reject) => {
      let instances = []
      axios.get(this.endpoint)
      .then((response) => {
        console.log(response)
        resolve(response.data.map(this.model.fromData))
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  }

  create(instance, csrfToken=null) {
    return new Promise((resolve, reject) => {
      axios.post(
        this.endpoint,
        instance.toData(),
        {
          headers: {'X-CSRFToken': csrfToken}
        })
      .then((response) => {
        console.log(response)
        resolve(this.model.fromData(response.data))
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  }

  update(instance, csrfToken=null) {
    return new Promise((resolve, reject) => {
      axios.put(
        this.endpoint + `${instance.id}/`,
        instance.toData(),
        {
          headers: {'X-CSRFToken': csrfToken}
        })
      .then((response) => {
        console.log(response)
        resolve(this.model.fromData(response.data))
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  }

  save(instance, csrfToken=null) {
    if (instance.id == null) {
      return this.create(instance, csrfToken)
    } else {
      return this.update(instance, csrfToken)
    }
  }

  destroy(instance, csrfToken=null) {
    return new Promise((resolve, reject) => {
      axios.delete(
        this.endpoint + `${instance.id}/`,
        {
          headers: {'X-CSRFToken': csrfToken}
        })
      .then((response) => {
        console.log(response)
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
