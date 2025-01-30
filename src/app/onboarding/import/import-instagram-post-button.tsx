'use client'

import { Button } from '@/components/ui/button'
import { DialogHeader, DialogFooter, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger, Dialog } from '@/components/ui/dialog'
import { IllustrationShop } from '@/components/svg/illustration-shop'
import { useFormStatus } from 'react-dom'
import { LoaderCircle } from 'lucide-react'
import { Post } from './intagram-selectable-post'

interface ImportInstagramActionsProps {
  handleSelect(): void
  posts: Post[]
  triggerDisabled: boolean
  onSubmit(): void
}

export function ImportInstagramActions({
  handleSelect,
  posts,
  triggerDisabled,
  onSubmit
}: ImportInstagramActionsProps) {
  const { pending } = useFormStatus()

  return (
    <Dialog>
      <div className="flex gap-2 items-center">
        {pending && <LoaderCircle className='animate-spin text-primary' />}
        <Button onClick={handleSelect} disabled={posts.length < 1} type='button' variant="ghost">
          {posts.every(post => post.isSelected) ? 'Deselecionar Todos' : 'Selecionar Todos'}
        </Button>
        <DialogTrigger asChild>
          <Button type='button' disabled={pending || triggerDisabled} size="sm">
            {pending ? 'Carregando...' : 'Importar'}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deseja importar os items selecionados?</DialogTitle>
            <DialogDescription>
              Iremos utilizar os items selecionados para gerar o catálogo de produtos da sua loja.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-x-2">
            <IllustrationShop />
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="submit" onClick={() => onSubmit()}>
                Importar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  )
}
