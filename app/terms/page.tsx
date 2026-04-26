import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using Verdara ("the Platform"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.

These Terms of Service apply to all visitors, users, and others who access or use the Platform.`
  },
  {
    title: "Description of Service",
    content: `Verdara is a fragrance discovery platform that provides:

- A comprehensive database of fragrances and perfume information
- User reviews, ratings, and community discussions
- Personalized fragrance recommendations and discovery tools
- Collection management and wishlist features
- Educational content about perfumery

We reserve the right to modify, suspend, or discontinue any aspect of the Platform at any time without notice.`
  },
  {
    title: "User Accounts",
    content: `To access certain features of the Platform, you may be required to create an account. You agree to:

- Provide accurate, current, and complete information during registration
- Maintain the security of your password and account
- Accept responsibility for all activities that occur under your account
- Notify us immediately of any unauthorized use of your account

We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent or harmful activity.`
  },
  {
    title: "User Content",
    content: `You retain ownership of content you submit to the Platform, including reviews, ratings, comments, and collection information ("User Content"). By submitting User Content, you grant Verdara a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display your User Content in connection with the Platform.

You agree that your User Content will not:
- Infringe on any third party's intellectual property rights
- Contain false, misleading, or defamatory statements
- Include spam, advertising, or promotional material
- Violate any applicable laws or regulations
- Contain harmful, offensive, or inappropriate content`
  },
  {
    title: "Intellectual Property",
    content: `The Platform and its original content (excluding User Content), features, and functionality are owned by Verdara and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

You may not:
- Copy, modify, or distribute Platform content without permission
- Use the Verdara name, logo, or trademarks without authorization
- Reverse engineer or attempt to extract source code
- Use automated systems to access the Platform without permission`
  },
  {
    title: "Prohibited Activities",
    content: `You agree not to engage in any of the following activities:

- Violating any applicable laws or regulations
- Impersonating another person or entity
- Interfering with or disrupting the Platform or servers
- Attempting to gain unauthorized access to any portion of the Platform
- Using the Platform for any commercial purpose without authorization
- Harvesting or collecting user information without consent
- Transmitting viruses, malware, or other harmful code
- Engaging in any conduct that restricts or inhibits anyone's use of the Platform`
  },
  {
    title: "Third-Party Links",
    content: `The Platform may contain links to third-party websites or services that are not owned or controlled by Verdara. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.

You acknowledge and agree that Verdara shall not be responsible or liable for any damage or loss caused by the use of any such content, goods, or services available through any third-party websites or services.`
  },
  {
    title: "Disclaimer of Warranties",
    content: `THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. VERDARA MAKES NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIMS ALL WARRANTIES, INCLUDING WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

Verdara does not warrant that:
- The Platform will function uninterrupted, secure, or error-free
- The results obtained from the Platform will be accurate or reliable
- Any errors in the Platform will be corrected`
  },
  {
    title: "Limitation of Liability",
    content: `IN NO EVENT SHALL VERDARA, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:

- Your access to or use of or inability to access or use the Platform
- Any conduct or content of any third party on the Platform
- Any content obtained from the Platform
- Unauthorized access, use, or alteration of your transmissions or content`
  },
  {
    title: "Indemnification",
    content: `You agree to defend, indemnify, and hold harmless Verdara and its licensees and licensors, and their employees, contractors, agents, officers, and directors, from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from:

- Your use of and access to the Platform
- Your violation of any term of these Terms of Service
- Your violation of any third party right, including any copyright, property, or privacy right
- Any claim that your User Content caused damage to a third party`
  },
  {
    title: "Governing Law",
    content: `These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.

Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in effect.`
  },
  {
    title: "Changes to Terms",
    content: `We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.

By continuing to access or use our Platform after any revisions become effective, you agree to be bound by the revised terms.`
  },
  {
    title: "Contact Us",
    content: `If you have any questions about these Terms of Service, please contact us at:

Email: legal@verdara.com
Address: 123 Fragrance Way, San Francisco, CA 94102`
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
              Terms of Service
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last Updated: April 26, 2026
            </p>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              Please read these Terms of Service carefully before using the Verdara platform. Your access to and use of the service is conditioned on your acceptance of and compliance with these terms.
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
