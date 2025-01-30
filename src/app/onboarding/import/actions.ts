'use server'

import { FacebookAdsApi } from "facebook-nodejs-business-sdk"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

interface InstagramBusinessAccount {
  id: string;
  name: string;
  username: string;
  profile_picture_url: string;
  media: { data: InstagramBusinessAccountMedia[] }
}
export interface InstagramBusinessAccountMedia {
  id: string;
  thumbnail_url: string;
  media_type: string;
  media_url: string;
  caption: string;
}
interface FetchInstagramAccountResponse {
  account: InstagramBusinessAccount
  posts: InstagramBusinessAccountMedia[]
}

export async function fetchInstagramAccount(): Promise<FetchInstagramAccountResponse> {
  const token = cookies().get('FB_ACCESS_TOKEN')
  const api = FacebookAdsApi.init(token!.value)

  const { data } = await api.call('GET', ['me/accounts'], {
    fields: 'id,name,instagram_business_account{id,name,username,profile_picture_url, media{id, thumbnail_url, media_type, media_url, caption}}'
  }).catch(() => redirect('/auth/sign-in'))
  const account = data[0].instagram_business_account
  const posts = data[0].instagram_business_account.media.data

  return { account, posts }
}

export async function createProductFromImages(_prevState: any, formData: FormData) {
  const posts = formData.getAll('posts')

  if (posts.length < 1) return { message: 'Selecione ao menos 1 produto.' }

  const promise = new Promise((resolve) => setTimeout(() => {
    resolve(posts)
  }, 3000))

  return promise as Promise<InstagramBusinessAccountMedia['id'][]>
}
