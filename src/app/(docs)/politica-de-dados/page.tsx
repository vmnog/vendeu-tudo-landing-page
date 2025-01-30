import { Header } from '@/components/header';
import { LogoLightTheme } from '@/components/svg/logo-light-theme';
import Head from 'next/head';

export default function DataDeletionPolicy() {
  return (
    <>
      <Header hideNavLinks />
      <div className="bg-indigo-200 text-gray-900 py-10">
        <Head>
          <title>Política de Exclusão de Dados</title>
        </Head>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <LogoLightTheme />
          <h1 className="text-3xl font-bold mb-4">Política de Exclusão de Dados</h1>
          <p className="mb-4">Última atualização: Jun 2024.</p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Introdução</h2>
            <p className="mb-4">
              Na Vendeu Tudo, levamos a sua privacidade a sério e estamos comprometidos em proteger os seus dados pessoais. Esta Política de Exclusão de Dados explica como tratamos os dados pessoais e o que acontece com os seus dados quando você solicita a exclusão da sua conta.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Coleta e Tratamento de Dados</h2>
            <p className="mb-4">
              Coletamos e tratamos dados pessoais para gerenciar seu relacionamento conosco e oferecer a melhor experiência possível em nossa plataforma. Os dados coletados podem incluir, mas não se limitam a:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Informações de contato: nome, e-mail, telefone, endereço.</li>
              <li>Dados de navegação: endereço IP, localização geográfica, histórico de navegação.</li>
              <li>Dados de transações: histórico de compras, detalhes de pagamento.</li>
              <li>Preferências e interesses: produtos visualizados, listas de desejos.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Solicitação de Exclusão de Conta</h2>
            <p className="mb-4">
              Se você deseja excluir sua conta na Vendeu Tudo e deletar todos os dados pessoais associados, siga as instruções abaixo:
            </p>
            <ul className="list-decimal list-inside mb-4">
              <li>Envie um e-mail para <a href="mailto:suporte@vendeutudo.com.br" className="text-blue-500">suporte@vendeutudo.com.br</a> com o assunto &quot;Solicitação de Exclusão de Conta&quot;.</li>
              <li>No corpo do e-mail, forneça o seu nome completo, endereço de e-mail associado à sua conta e uma solicitação clara de exclusão de conta e dados pessoais.</li>
              <li>Nossa equipe de suporte confirmará a sua solicitação e iniciará o processo de exclusão de dados. Você receberá uma confirmação de que sua conta e dados pessoais foram excluídos dentro de 10 dias úteis.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Processo de Exclusão de Dados</h2>
            <p className="mb-4">
              Após a solicitação de exclusão de conta, seguiremos os passos abaixo para garantir que todos os seus dados pessoais sejam removidos de nossos sistemas:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Identificação e verificação da solicitação de exclusão de conta.</li>
              <li>Remoção de todos os dados pessoais dos bancos de dados ativos.</li>
              <li>Desvinculação de qualquer dado pessoal armazenado em backups. Os dados em backups serão eliminados conforme os ciclos de retenção de backup.</li>
              <li>Confirmação ao usuário da conclusão do processo de exclusão de dados.</li>
            </ul>
            <p className="mb-4">
              É importante notar que algumas informações podem ser retidas se necessário para cumprir com obrigações legais, resolver disputas ou fazer cumprir nossos acordos.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Segurança dos Dados</h2>
            <p className="mb-4">
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, perda, destruição ou alteração. Embora nos esforcemos para proteger suas informações, não podemos garantir a segurança completa de todos os dados transmitidos para nosso site.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Seus Direitos</h2>
            <p className="mb-4">
              Você tem o direito de acessar, corrigir, portar e excluir seus dados pessoais. Além disso, pode restringir ou se opor ao processamento de seus dados pessoais. Para exercer esses direitos, entre em contato conosco pelo e-mail <a href="mailto:contato@vendeutudo.com.br" className="text-blue-500">contato@vendeutudo.com.br</a>.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Alterações a Esta Política</h2>
            <p className="mb-4">
              Podemos atualizar esta Política de Exclusão de Dados periodicamente. Quaisquer alterações serão publicadas nesta página com a data de revisão atualizada. Recomendamos que você revise esta política regularmente para se manter informado sobre nossas práticas de exclusão de dados.
            </p>
          </section>

          <p className="font-bold">Esta política é efetiva a partir de 1 de junho de 2024.</p>
        </div>
      </div>
    </>
  );
}
