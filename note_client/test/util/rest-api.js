/*
 * util/rest-api.jsのテスト
 */
import * as assert from 'power-assert'
import moxios from 'moxios'
import { RestApi } from 'util/rest-api'

/*
 * APIのレスポンスをラップするモデル
 */
class StubModel {
  constructor(id=null, value=null) {
    this.id = id
    this.value = value
  }

  static fromData(data) {
    return new StubModel(data.id, data.value)
  }

  toData() {
    return {
      value: this.value
    }
  }
}

describe('RestApi', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('list', (done) => {
    let target = new RestApi('/foo/bar/', StubModel)
    target.list().then((instances) => {
      assert.equal(1, instances[0].id)
      assert.equal('test1', instances[0].value)
      assert.equal(2, instances[1].id)
      assert.equal('test2', instances[1].value)
      assert.equal(2, instances.length, 'データは2件')
      // assertでエラーが発生した場合はdoneが呼ばれないため、
      // テストケースがtimeoutでfailになる
      done()
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
    // API呼び出しをモック
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: [
          {id: 1, value: 'test1'},
          {id: 2, value: 'test2'}
        ]
      })
    })
  })

  it('create', (done) => {
    let requestInstance = new StubModel(null, 'test123')
    let target = new RestApi('/foo/bar/', StubModel)
    target.create(requestInstance, 'csrf-token')
    .then((instance) => {
      assert.equal(1, instance.id)
      assert.equal('test123', instance.value)
      done()
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
    // API呼び出しをモック
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {id: 1, value: 'test123'}
      })
    })
  })

  it('update', (done) => {
    let requestInstance = new StubModel(1, 'test456')
    let target = new RestApi('/foo/bar/', StubModel)
    target.update(requestInstance, 'csrf-token')
    .then((instance) => {
      assert.equal(1, instance.id)
      assert.equal('test456', instance.value)
      done()
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
    // API呼び出しをモック
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {id: 1, value: 'test456'}
      })
    })
  })

  it('destroy', (done) => {
    let requestInstance = new StubModel(1, 'test456')
    let target = new RestApi('/foo/bar/', StubModel)
    target.destroy(requestInstance, 'csrf-token')
    .then(() => {
      done()
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
    // API呼び出しをモック
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200
      })
    })
  })
})
