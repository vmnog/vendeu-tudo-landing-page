'use client'

import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { IllustrationEmpty } from '@/components/svg/illustration-empty';
import { ImportInstagramActions } from './import-instagram-post-button';
import { InstagramBusinessAccountMedia, createProductFromImages } from './actions';
import { ErrorMessage } from '@/components/error-message';

export interface Post extends InstagramBusinessAccountMedia {
  isSelected?: boolean
}

export function InstagramSelectablePostList({ posts: initialPosts }: { posts: InstagramBusinessAccountMedia[] }) {
  const [state, formAction] = useFormState(createProductFromImages, [])
  const [posts, setPosts] = useState<Post[]>(initialPosts.map(post => ({ ...post, isSelected: false })))
  const [imported, setImported] = useState<string[]>([])
  const formRef = useRef<HTMLFormElement>(null)
  const postsRef = useRef(posts)

  useEffect(() => {
    if (!Array.isArray(state)) return
    const postsNotImported = postsRef.current.filter(post => !state.includes(post.id))
    const lastImportedPosts = state as string[]
    setImported(prev => [...prev, ...lastImportedPosts])
    setPosts(postsNotImported)
  }, [state])

  function handleToggleSelectedPost(postId: string) {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) return { ...post, isSelected: !post.isSelected }
      return post
    })
    setPosts(updatedPosts)
  }

  function handleSelectAll() {
    const allSelected = posts.every(post => post.isSelected)
    const updatedPosts = posts.map(post => ({ ...post, isSelected: !allSelected }))
    setPosts(updatedPosts)
  }

  function handleSubmit() {
    if (formRef.current) {
      formRef.current.requestSubmit()
    }
  }

  const selectedCount = posts.filter(post => post.isSelected).length

  return (
    <form action={formAction} ref={formRef} className='grid gap-8'>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className='flex gap-2 py-2'>
          <span>{imported.length}/{initialPosts.length} importados</span>{' / '}
          <span className='text-muted-foreground'>({selectedCount}/{posts.length} selecionados)</span>
        </div>
        <ImportInstagramActions
          onSubmit={handleSubmit}
          triggerDisabled={selectedCount < 1}
          handleSelect={handleSelectAll}
          posts={posts}
        />
      </div>

      {!Array.isArray(state) && <ErrorMessage message={state?.message} />}

      {posts.length > 0 ? (
        <ScrollArea className='sm:max-h-[500px]'>
          <ul className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
            {posts.map(post => (
              <InstagramSelectablePost key={post.id} post={post} onToggle={handleToggleSelectedPost} />
            ))}
          </ul>
        </ScrollArea>
      ) : (
        <div className='flex flex-col items-center justify-center gap-8'>
          <IllustrationEmpty />
          <strong className='text-muted-foreground font-light text-sm'>Parece que não sobrou nenhum item para selecionar.</strong>
        </div>
      )}
    </form>
  )
}

interface InstagramSelectablePostProps {
  post: Post
  onToggle(postId: string): void
}

export function InstagramSelectablePost({ post, onToggle }: InstagramSelectablePostProps) {
  return (
    <li className='cursor-pointer relative group'>
      <Label className="relative cursor-pointer rounded-md overflow-hidden block shadow">
        <Checkbox name="posts" className="hidden peer absolute top-2 right-2 z-10" value={post.id} checked={post.isSelected} onCheckedChange={() => onToggle(post.id)} />
        <Check className='peer-data-[state=unchecked]:hidden text-primary-foreground visible absolute top-1/2 left-1/2 z-10 size-8 transform -translate-x-1/2 -translate-y-1/2' />
        <span className='peer-data-[state=checked]:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible group-hover:visible'>
          <Button size="sm">
            Selecionar
          </Button>
        </span>
        <img
          className='object-cover size-full aspect-square rounded-md peer-data-[state=checked]:blur-sm'
          src={post.media_url}
          alt={post.id}
          width={1000}
          height={1000}
        />

        <div className="peer-data-[state=checked]:bg-black/30 transition-colors absolute inset-0" />
      </Label>
    </li>
  )
}
