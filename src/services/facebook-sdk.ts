export const initFacebookSdk = () =>
  new Promise((resolve) => {
    // @ts-ignore
    window.fbAsyncInit = () => {
      // @ts-ignore
      window.FB.init({
        appId: '766867202195930',
        cookie: true,
        xfbml: true,
        version: 'v20.0'
      })
      // @ts-ignore
      resolve()
    }
  })

export const fbLogout = () => {
  return new Promise((resolve) => {
    // @ts-ignore
    window.FB.logout((response) => {
      resolve(response)
    })
  })
}

interface FacebookAuthResponse {
  authResponse: {
    userID: string;
    expiresIn: number;
    accessToken: string;
    signedRequest: string;
    graphDomain: string;
    data_access_expiration_time: number;
  }
  status: 'connected' | 'unknown' | 'not_authorized'
}

export const fbLogin = (): Promise<FacebookAuthResponse> => {
  return new Promise((resolve) => {
    // @ts-ignore
    window.FB.login((response: FacebookAuthResponse) => {
      resolve(response)
    }, {
      scope: [
        'pages_show_list',
        'pages_read_engagement',
        'instagram_basic',
        // 'instagram_content_publish',
        // 'business_management',
      ]
    })
  })
}
