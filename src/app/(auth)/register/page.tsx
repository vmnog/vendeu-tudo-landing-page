import { type Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'

export const metadata: Metadata = {
  title: 'Cadastrar',
}

export default function Register() {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Início">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Comece gratuitamente
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Já está registrado?{' '}
        <Link
          href="/login"
          className="font-medium text-indigo-500 hover:underline"
        >
          Entre
        </Link>{' '}
        na sua conta.
      </p>
      <form
        action="#"
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <TextField
          label="Nome"
          name="first_name"
          type="text"
          autoComplete="given-name"
          required
        />
        <TextField
          label="Sobrenome"
          name="last_name"
          type="text"
          autoComplete="family-name"
          required
        />
        <TextField
          className="col-span-full"
          label="Endereço de e-mail"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          className="col-span-full"
          label="Senha"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
        {/* <SelectField */}
        {/*   className="col-span-full" */}
        {/*   label="Como você nos encontrou?" */}
        {/*   name="referral_source" */}
        {/* > */}
        {/*   <option>Pesquisa AltaVista</option> */}
        {/*   <option>Comercial do Super Bowl</option> */}
        {/*   <option>Anúncio no ônibus da rota 34</option> */}
        {/*   <option>Podcast “Never Use This”</option> */}
        {/* </SelectField> */}
        <div className="col-span-full">
          <Button type="submit" variant="solid" color="indigo" className="w-full">
            <span>
              Cadastrar <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
