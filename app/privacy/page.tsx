import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const sections = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, submit reviews, or contact us. This may include:

- Name and email address
- Profile information and preferences
- Fragrance reviews and ratings
- Collection and wishlist data
- Communications with us

We also automatically collect certain information when you use our platform, including device information, IP address, and browsing behavior through cookies and similar technologies.`
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to:

- Provide, maintain, and improve our services
- Personalize your fragrance recommendations
- Process your account registration and manage your profile
- Send you updates, newsletters, and marketing communications (with your consent)
- Respond to your comments, questions, and requests
- Monitor and analyze trends, usage, and activities
- Detect, investigate, and prevent fraudulent transactions and other illegal activities
- Comply with legal obligations`
  },
  {
    title: "Information Sharing",
    content: `We do not sell your personal information. We may share your information in the following circumstances:

- With your consent or at your direction
- With service providers who perform services on our behalf
- To comply with legal obligations
- To protect the rights, privacy, safety, or property of Verdara, you, or others
- In connection with a merger, acquisition, or sale of assets

Your public profile information, reviews, and ratings are visible to other users of the platform.`
  },
  {
    title: "Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.

We use encryption, secure servers, and regular security audits to protect your data. We also limit access to personal information to employees who need it to perform their job functions.`
  },
  {
    title: "Your Rights and Choices",
    content: `You have certain rights regarding your personal information:

- Access: You can request access to the personal information we hold about you
- Correction: You can update or correct your personal information through your account settings
- Deletion: You can request deletion of your account and associated data
- Opt-out: You can opt out of marketing communications at any time
- Data portability: You can request a copy of your data in a portable format

To exercise these rights, please contact us at privacy@verdara.com.`
  },
  {
    title: "Cookies and Tracking",
    content: `We use cookies and similar tracking technologies to collect information about your browsing activities. You can manage your cookie preferences through your browser settings.

Types of cookies we use:
- Essential cookies: Required for basic site functionality
- Analytics cookies: Help us understand how visitors interact with our site
- Preference cookies: Remember your settings and preferences
- Marketing cookies: Used to deliver relevant advertisements`
  },
  {
    title: "Children's Privacy",
    content: `Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete that information.`
  },
  {
    title: "International Data Transfers",
    content: `Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. We take appropriate safeguards to ensure your personal information remains protected.`
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.`
  },
  {
    title: "Contact Us",
    content: `If you have any questions about this Privacy Policy or our privacy practices, please contact us at:

Email: privacy@verdara.com
Address: 123 Fragrance Way, San Francisco, CA 94102`
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last Updated: April 26, 2026
            </p>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              At Verdara, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
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
