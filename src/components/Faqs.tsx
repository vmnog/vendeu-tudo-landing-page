import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'Como a Vendeu Tudo pode ajudar minha loja física?',
      answer: 'Vendeu Tudo facilita a migração da sua loja física para o digital, automatizando a importação de produtos do Instagram e gerenciando seu catálogo online.',
    },
    {
      question: 'É fácil importar meus produtos do Instagram?',
      answer: 'Sim, com Vendeu Tudo você pode importar facilmente produtos de posts, stories e destaques do Instagram para sua loja online.',
    },
  ],
  [
    {
      question: 'Como a atualização automática de catálogo funciona?',
      answer: 'A atualização automática de catálogo sincroniza novos produtos postados no Instagram diretamente com sua loja online, mantendo seu inventário sempre atualizado.',
    },
    {
      question: 'Posso personalizar minha loja online?',
      answer: 'Sim, todos os planos oferecem algum nível de personalização, com o plano Business oferecendo personalização avançada de layout e design.',
    },
    {
      question: 'O que é a integração com IA e como ela ajuda minha loja?',
      answer: 'A integração com IA auxilia na criação de posts e na análise de vendas, fornecendo recomendações baseadas em dados para otimizar seu desempenho e engajamento.',
    },
  ],
  [
    {
      question: 'Como posso adicionar funcionários para ajudar na gestão da loja?',
      answer: 'Nos planos Instagram Shop e Business, você pode adicionar funcionários e definir diferentes níveis de acesso, facilitando a colaboração na gestão da loja.',
    },
    {
      question: 'A Vendeu Tudo é segura para minha loja e meus clientes?',
      answer: 'Sim, priorizamos a segurança com autenticação segura e proteção de dados, garantindo que sua loja e as informações dos seus clientes estejam sempre protegidas.',
    },
  ],
];

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Ainda não entendeu?
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Se você não encontrar o que está procurando, envie um e-mail para nossa equipe de suporte e, com sorte, alguém responderá.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
