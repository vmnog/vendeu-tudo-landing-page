import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-indigo-500 py-32"
    >
      <Image
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Mais Vendas, Menos Trabalho
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            Chegou a hora de assumir o controle do seu negócio. Use a <strong>Vendeu Tudo</strong> para sincronizar seu Instagram e automatizar suas vendas.
          </p>
          <Button href="/register" color="white" className="mt-10">
            Criar minha loja
          </Button>
        </div>
      </Container>
    </section>
  )
}
