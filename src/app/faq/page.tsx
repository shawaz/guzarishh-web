import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQPage() {
  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 3-5 business days across the UAE. Express shipping (1-2 business days) is available for an additional fee. We offer free shipping on orders above AED 200."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship internationally to select countries. International shipping costs and delivery times vary by destination. Please contact us for specific international shipping rates and delivery estimates."
        },
        {
          question: "Can I track my order?",
          answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can track your package using the tracking number on our website or the courier's website."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express), bank transfers, and cash on delivery (COD) for select areas in the UAE. All payments are processed securely through Telr payment gateway."
        }
      ]
    },
    {
      category: "Products & Sizing",
      questions: [
        {
          question: "How do I choose the right size?",
          answer: "We provide detailed size charts for each product category. Please refer to our size guide on each product page. If you're unsure, contact our customer service team for personalized sizing assistance."
        },
        {
          question: "Are your products authentic Indian fashion?",
          answer: "Yes! All our products are sourced directly from authentic Indian manufacturers and artisans. We work with trusted suppliers to ensure the highest quality and authenticity of traditional Indian craftsmanship."
        },
        {
          question: "Do you offer custom sizing?",
          answer: "Yes, we offer custom sizing for select products including sarees and lehengas. Custom orders take 2-3 weeks for completion. Please contact us to discuss your custom sizing requirements."
        },
        {
          question: "What materials are used in your products?",
          answer: "We use premium materials including pure silk, cotton, chiffon, georgette, and traditional fabrics like Banarasi silk, Kanjivaram silk, and more. Each product listing includes detailed material information."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy from the delivery date. Items must be in original condition with tags attached. Free returns are available for orders above AED 200 or defective items."
        },
        {
          question: "How do I initiate a return?",
          answer: "Contact us at returns@guzarishh.com or call +971 XX XXX XXXX within 30 days of delivery. We'll provide you with a Return Authorization Number and return instructions."
        },
        {
          question: "How long do refunds take?",
          answer: "Refunds are processed within 5-10 business days after we receive and inspect the returned item. The refund will be credited to your original payment method."
        },
        {
          question: "Can I exchange for a different size or color?",
          answer: "Yes! We offer free size and color exchanges within 30 days of delivery, subject to availability. The exchange process takes 5-7 business days."
        }
      ]
    },
    {
      category: "Care & Maintenance",
      questions: [
        {
          question: "How do I care for silk sarees?",
          answer: "Silk sarees should be dry cleaned only. Store them in a cool, dry place away from direct sunlight. Use a cloth barrier when ironing on low heat. Avoid contact with perfumes or deodorants."
        },
        {
          question: "Can I wash cotton kurtis at home?",
          answer: "Yes, most cotton kurtis can be machine washed in cold water. Use mild detergent and tumble dry on low heat. Iron on medium heat for best results."
        },
        {
          question: "How do I store traditional jewelry?",
          answer: "Store jewelry in a cool, dry place in individual pouches or boxes. Clean with a soft cloth and avoid contact with perfumes or chemicals. For intricate pieces, consider professional cleaning."
        },
        {
          question: "What if my item gets damaged during washing?",
          answer: "Please follow the care instructions provided with each item. If damage occurs due to incorrect washing despite following instructions, contact us within 48 hours with photos for assistance."
        }
      ]
    },
    {
      category: "Account & Support",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button on our website and provide your email address and password. You can also create an account during checkout. Account creation is free and optional."
        },
        {
          question: "I forgot my password. How do I reset it?",
          answer: "Click 'Forgot Password' on the login page and enter your email address. We'll send you a password reset link. Check your spam folder if you don't receive the email."
        },
        {
          question: "How can I contact customer service?",
          answer: "You can reach us via email at info@guzarishh.com, phone at +971 XX XXX XXXX, or WhatsApp at +971 XX XXX XXXX. Our customer service hours are Sunday-Thursday, 9 AM-6 PM (UAE time)."
        },
        {
          question: "Do you have a physical store?",
          answer: "Currently, we operate as an online store. However, we're planning to open a showroom in Dubai soon. Follow us on social media for updates about our physical location."
        }
      ]
    },
    {
      category: "Business Information",
      questions: [
        {
          question: "Where is Guzarishh based?",
          answer: "Guzarishh is registered and operates from Dubai, United Arab Emirates. We serve customers across the UAE and internationally through our online platform."
        },
        {
          question: "Are you VAT registered?",
          answer: "Yes, we are VAT registered in the UAE. All prices displayed include applicable VAT as per UAE regulations."
        },
        {
          question: "Do you offer wholesale pricing?",
          answer: "Yes, we offer wholesale pricing for bulk orders and retailers. Please contact our business development team at wholesale@guzarishh.com for more information."
        },
        {
          question: "Can I become a reseller or partner?",
          answer: "We're always interested in partnering with retailers and resellers. Please contact us at partnerships@guzarishh.com to discuss partnership opportunities."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-gray-600">
                Find answers to common questions about our products, services, and policies
              </p>
            </div>

            <div className="space-y-8">
              {faqs.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="text-2xl">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12">
              <CardHeader>
                <CardTitle>Still Have Questions?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Can't find the answer you're looking for? Our customer service team is here to help!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">Email Us</h4>
                    <p className="text-sm text-gray-600">info@guzarishh.com</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">Call Us</h4>
                    <p className="text-sm text-gray-600">+971 XX XXX XXXX</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">WhatsApp</h4>
                    <p className="text-sm text-gray-600">+971 XX XXX XXXX</p>
                  </div>
                </div>
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-500">
                    Business Hours: Sunday - Thursday, 9:00 AM - 6:00 PM (UAE Time)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
