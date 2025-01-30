import { Header } from '@/components/header';
import { LogoLightTheme } from '@/components/svg/logo-light-theme';
import Head from 'next/head';

export default function TermsOfService() {
  return (
    <>
      <Header hideNavLinks />
      <div className="bg-indigo-200 text-gray-900 py-10">
        <Head>
          <title>Termos de Serviço - Vendeu Tudo</title>
        </Head>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <LogoLightTheme />
          <h1 className="text-3xl font-bold mb-4">Termos de Serviço</h1>
          <p className="mb-4">Última atualização: Junho 2024.</p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Introdução</h2>
            <p className="mb-4">
              Ao utilizar a plataforma Vendeu Tudo, você concorda em estar vinculado por estes Termos de Serviço, que regem seu acesso e uso de nosso site e serviços. Se você não concorda com estes termos, não deve acessar ou usar Vendeu Tudo.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Uso do Serviço</h2>
            <p className="mb-4">
              Você concorda em usar nossa plataforma apenas para fins legais e de acordo com os termos estipulados. É proibido o uso do serviço para qualquer atividade que viole leis federais, estaduais ou locais.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Conteúdo da Plataforma</h2>
            <p className="mb-4">
              O conteúdo disponibilizado no Vendeu Tudo, incluindo textos, gráficos, imagens e informações obtidas de licenciantes, é protegido por direitos autorais, marcas registradas e outras leis. O uso não autorizado do conteúdo pode violar esses direitos.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Contas e Segurança</h2>
            <p className="mb-4">
              Você é responsável por manter a confidencialidade das informações de sua conta, incluindo sua senha, e por todas as atividades que ocorram com sua conta. Você concorda em notificar imediatamente o Vendeu Tudo sobre qualquer uso não autorizado de sua conta.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Limitação de Responsabilidade</h2>
            <p className="mb-4">
              Vendeu Tudo não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou da incapacidade de usar nossos serviços.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Alterações aos Termos</h2>
            <p className="mb-4">
              Reservamo-nos o direito de modificar estes Termos de Serviço a qualquer momento. Qualquer alteração será efetiva imediatamente após a publicação no site. Sua continuação de uso do serviço após tais mudanças constituirá seu consentimento com tais alterações.
            </p>
          </section>

          <p className="font-bold">Estes Termos são efetivos a partir de 1 de Junho de 2024.</p>
        </div>
      </div>
    </>
  );
}
