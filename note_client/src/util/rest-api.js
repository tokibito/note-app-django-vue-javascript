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
}

export {
  RestApi
}
