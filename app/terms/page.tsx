import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const sections = [
  {
    title: "Aceitacao dos termos",
    content: `Ao acessar ou usar a Verdara ("Plataforma"), voce concorda com estes Termos de Servico e com a legislacao aplicavel.

Se nao concordar, nao deve utilizar este site. Estes termos se aplicam a visitantes, usuarios e qualquer pessoa que acesse a Plataforma.`
  },
  {
    title: "Descricao do servico",
    content: `A Verdara e uma plataforma de descoberta de fragrancias que oferece:

- Banco de dados de fragrancias e informacoes de perfumes
- Avaliacoes, notas e discussoes da comunidade
- Recomendacoes personalizadas e ferramentas de descoberta
- Recursos de colecao e lista de desejos
- Conteudo educativo sobre perfumaria

Podemos modificar, suspender ou encerrar qualquer parte da Plataforma a qualquer momento, sem aviso previo.`
  },
  {
    title: "Contas de usuario",
    content: `Para acessar alguns recursos, voce pode precisar criar conta. Voce concorda em:

- Fornecer informacoes corretas e atualizadas
- Manter a seguranca da senha e da conta
- Assumir responsabilidade pelas atividades da conta
- Informar uso nao autorizado imediatamente

Podemos suspender ou encerrar contas que violem estes termos ou pratiquem atividade fraudulenta/prejudicial.`
  },
  {
    title: "Conteudo do usuario",
    content: `Voce mantem a titularidade do conteudo enviado (avaliacoes, comentarios, notas e colecoes). Ao enviar conteudo, concede a Verdara licenca mundial, nao exclusiva e sem royalties para uso no contexto da Plataforma.

Seu conteudo nao pode:
- Violar propriedade intelectual de terceiros
- Conter informacoes falsas, enganosas ou difamatorias
- Incluir spam, publicidade ou promocao indevida
- Violar leis e regulamentos aplicaveis
- Conter material ofensivo ou inadequado`
  },
  {
    title: "Propriedade intelectual",
    content: `A Plataforma e seu conteudo original (exceto conteudo de usuario) pertencem a Verdara e sao protegidos por leis de propriedade intelectual.

Voce nao pode:
- Copiar, modificar ou distribuir conteudo sem permissao
- Usar nome, logo ou marcas da Verdara sem autorizacao
- Fazer engenharia reversa ou tentar extrair codigo-fonte
- Usar sistemas automatizados sem permissao`
  },
  {
    title: "Atividades proibidas",
    content: `Voce concorda em nao praticar:

- Violacao de leis e regulamentos
- Falsidade de identidade
- Interferencia no funcionamento da Plataforma
- Tentativa de acesso nao autorizado
- Uso comercial sem autorizacao
- Coleta de dados sem consentimento
- Envio de virus, malware ou codigo malicioso
- Conduta que limite o uso da Plataforma por terceiros`
  },
  {
    title: "Links de terceiros",
    content: `A Plataforma pode conter links para sites e servicos de terceiros. A Verdara nao controla e nao se responsabiliza por conteudo, politicas ou praticas desses terceiros.`
  },
  {
    title: "Isencao de garantias",
    content: `A PLATAFORMA E OFERECIDA "NO ESTADO EM QUE SE ENCONTRA" E "CONFORME DISPONIBILIDADE". A VERDARA NAO OFERECE GARANTIAS EXPRESSAS OU IMPLICITAS.

Nao garantimos que:
- A Plataforma funcione sem interrupcoes ou erros
- Os resultados sejam sempre precisos
- Todas as falhas sejam corrigidas`
  },
  {
    title: "Limitacao de responsabilidade",
    content: `EM NENHUMA HIPOTESE A VERDARA SERA RESPONSAVEL POR DANOS INDIRETOS, INCIDENTAIS, ESPECIAIS OU CONSEQUENCIAIS DECORRENTES DE:

- Uso ou impossibilidade de uso da Plataforma
- Conduta ou conteudo de terceiros
- Conteudo obtido na Plataforma
- Acesso nao autorizado aos seus dados ou transmissoes`
  },
  {
    title: "Indenizacao",
    content: `Voce concorda em indenizar a Verdara por reclamacoes, danos, perdas e custos decorrentes de:

- Seu uso da Plataforma
- Violacao destes Termos
- Violacao de direitos de terceiros
- Reclamacoes relacionadas ao conteudo enviado por voce`
  },
  {
    title: "Lei aplicavel",
    content: `Estes Termos sao regidos pelas leis do Estado da California, Estados Unidos.

Se qualquer disposicao for considerada invalida, as demais permanecem em vigor.`
  },
  {
    title: "Alteracoes nos termos",
    content: `Podemos atualizar estes Termos a qualquer momento. Em caso de alteracoes relevantes, publicaremos aviso com antecedencia razoavel.

Ao continuar usando a Plataforma apos as alteracoes, voce concorda com os novos termos.`
  },
  {
    title: "Contato",
    content: `Se tiver duvidas sobre estes Termos, entre em contato:

Email: legal@verdara.com
Endereco: 123 Fragrance Way, San Francisco, CA 94102`
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
              Termos de servico
            </h1>
            <p className="mt-4 text-muted-foreground">
              Ultima atualizacao: 26 de abril de 2026
            </p>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              Leia estes Termos de Servico com atencao antes de usar a Verdara. Seu acesso e uso dependem da sua concordancia com estas regras.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <div className="prose prose-sm text-muted-foreground whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
