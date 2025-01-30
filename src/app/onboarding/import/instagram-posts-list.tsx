import { InstagramSelectablePostList } from './intagram-selectable-post';
import { fetchInstagramAccount } from './actions';
import { Suspense } from 'react';
import { NextStepButton } from '../next-step-button';

export async function InstagramPostsList() {
  const { account, posts } = await fetchInstagramAccount()
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-4'>
        <img
          className='size-14 rounded-full'
          src={account.profile_picture_url}
          alt={account.username}
          width={100}
          height={100}
        />
        <div className='flex flex-col gap-2'>
          <strong>@{account.username}</strong>
          <span>{account.name}</span>
        </div>
      </div>

      <InstagramSelectablePostList posts={posts} />

      <Suspense>
        <NextStepButton />
      </Suspense>
    </div>
  )
}
