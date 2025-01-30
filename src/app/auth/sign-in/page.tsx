'use client';

import Link from 'next/link';
import { facebookSignIn } from './actions';
import { Button } from '@/components/ui/button';
import { fbLogin } from '@/services/facebook-sdk';
import { InstagramLogoIcon } from '@radix-ui/react-icons';
import { SlimLayout } from '@/components/slim-layout';
import { LogoLightTheme } from '@/components/svg/logo-light-theme';
import { useToast } from '@/components/ui/use-toast';

export default function Login() {
  const { toast } = useToast()

  return (
    <SlimLayout>
      <title>Login | Vendeu Tudo</title>
      <div className="flex justify-center">
        <Link href="/" aria-label="Voltar para o Início">
          <LogoLightTheme />
        </Link>
      </div>
      <form onSubmit={async (event) => {
        event.preventDefault();
        fbLogin().then(async (response) => {
          await facebookSignIn(response.authResponse.accessToken);
        }).catch(() => {
          toast({
            title: 'Não foi possível entrar com sua conta',
            description: 'Caso o problema persista, entre em contato com o suporte.',
            variant: 'destructive'
          })
        });
      }} className="mt-10 px-4 space-y-4">
        <p className='text-gray-400 text-sm text-center'>Caso seu cadastro não exista, criaremos sua conta no mesmo instante.</p>
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="home"
            className='w-full max-w-xs text-white bg-gradient-to-tr from-purple-500 to-pink-500 hover:opacity-90'>
            <span className='flex items-center justify-center gap-2'>
              Entrar com Instagram
              <InstagramLogoIcon className='size-6' />
            </span>
          </Button>
        </div>
        <p className="mt-8 text-center text-sm text-gray-400">
          Ao clicar em &quot;Entrar&quot;, você concorda com nossos{' '}
          <Link href="https://www.vendeutudo.com.br/termos-de-uso">
            <span className="text-gray-400 hover:text-gray-600 font-medium">
              Termos de Uso
            </span>
          </Link>{' '}e{' '}
          <Link href="https://www.vendeutudo.com.br/politica-de-privacidade">
            <span className="text-gray-400 hover:text-gray-600 font-medium">
              Política de Privacidade
            </span>
          </Link>.
        </p>
      </form>
    </SlimLayout>
  )
}
