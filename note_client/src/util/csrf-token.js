import cookie from 'cookie'

const getCsrfTokenFromCookie = cookieString => {
  let cookies = cookie.parse(cookieString)
  return cookies.csrftoken || null
}

export default {
  getCsrfTokenFromCookie
}
