import cookie from 'cookie'

/*
 * DjangoフレームワークがCookieに格納したCSRFトークンを取り出す関数
 */
const getCsrfTokenFromCookie = cookieString => {
  let cookies = cookie.parse(cookieString)
  return cookies.csrftoken || null
}

export default {
  getCsrfTokenFromCookie
}
