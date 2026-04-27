import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const sections = [
  {
    title: "Informacoes que coletamos",
    content: `Coletamos informacoes fornecidas diretamente por voce, como ao criar conta, publicar avaliacoes ou entrar em contato:

- Nome e endereco de e-mail
- Informacoes de perfil e preferencias
- Avaliacoes e notas de fragrancias
- Dados de colecao e lista de desejos
- Comunicacoes com nossa equipe

Tambem coletamos automaticamente dados de uso, como dispositivo, IP e navegacao, por meio de cookies e tecnologias semelhantes.`
  },
  {
    title: "Como usamos suas informacoes",
    content: `Usamos os dados coletados para:

- Fornecer, manter e melhorar os servicos
- Personalizar recomendacoes de fragrancias
- Gerenciar sua conta e perfil
- Enviar novidades e comunicacoes de marketing (com consentimento)
- Responder a comentarios, duvidas e solicitacoes
- Monitorar e analisar uso da plataforma
- Detectar e prevenir fraudes e atividades ilegais
- Cumprir obrigacoes legais`
  },
  {
    title: "Compartilhamento de informacoes",
    content: `Nao vendemos seus dados pessoais. Podemos compartilhar informacoes nas seguintes situacoes:

- Com seu consentimento ou por sua solicitacao
- Com prestadores de servico que atuam em nosso nome
- Para cumprimento de obrigacoes legais
- Para proteger direitos, privacidade e seguranca da Verdara, de voce ou de terceiros
- Em operacoes societarias (fusão, aquisicao ou venda de ativos)

Informacoes publicas de perfil, avaliacoes e notas podem ser visiveis para outros usuarios.`
  },
  {
    title: "Seguranca de dados",
    content: `Aplicamos medidas tecnicas e organizacionais para proteger seus dados contra acesso, alteracao, divulgacao ou destruicao nao autorizados.

Usamos criptografia, servidores seguros e revisoes periodicas. Ainda assim, nenhum metodo de transmissao ou armazenamento e 100% seguro.`
  },
  {
    title: "Seus direitos e escolhas",
    content: `Voce possui direitos sobre seus dados pessoais:

- Acesso: solicitar quais dados mantemos sobre voce
- Correcao: atualizar dados nas configuracoes da conta
- Exclusao: solicitar remocao da conta e dados relacionados
- Opt-out: deixar de receber comunicacoes de marketing
- Portabilidade: solicitar copia dos dados em formato portavel

Para exercer esses direitos, escreva para privacy@verdara.com.`
  },
  {
    title: "Cookies e rastreamento",
    content: `Usamos cookies e tecnologias similares para entender sua navegacao. Voce pode gerenciar preferencias no seu navegador.

Tipos de cookies:
- Essenciais: funcionamento basico do site
- Analiticos: entendimento de uso da plataforma
- Preferencias: memorizacao de configuracoes
- Marketing: exibicao de comunicacoes relevantes`
  },
  {
    title: "Privacidade de criancas",
    content: `Nossos servicos nao sao destinados a menores de 13 anos. Nao coletamos intencionalmente dados pessoais de criancas. Se identificarmos coleta indevida, removeremos as informacoes.`
  },
  {
    title: "Transferencias internacionais",
    content: `Seus dados podem ser transferidos e processados em outros paises, cujas leis de protecao podem ser diferentes das do seu pais. Adotamos salvaguardas apropriadas para manter a protecao dos dados.`
  },
  {
    title: "Alteracoes nesta politica",
    content: `Podemos atualizar esta Politica de Privacidade periodicamente. As mudancas serao publicadas nesta pagina com a data de ultima atualizacao revisada.`
  },
  {
    title: "Contato",
    content: `Se tiver duvidas sobre esta Politica de Privacidade, fale com a gente:

Email: privacy@verdara.com
Endereco: 123 Fragrance Way, San Francisco, CA 94102`
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
              Politica de privacidade
            </h1>
            <p className="mt-4 text-muted-foreground">
              Ultima atualizacao: 26 de abril de 2026
            </p>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              Na Verdara, levamos sua privacidade a serio. Esta politica explica como coletamos, usamos, compartilhamos e protegemos suas informacoes.
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
