/*
 * util/csrf-token.jsのテスト
 */
import * as assert from 'power-assert'
import csrfToken from 'util/csrf-token'

describe('csrfToken', () => {
  it('getCsrfTokenFromCookie', () => {
    let result = csrfToken.getCsrfTokenFromCookie(
      "foo=bar; csrftoken=token123; spam=egg")
    assert.equal('token123', result)
  })
})
