import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
            
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Introduction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Welcome to Guzarishh ("we," "our," or "us"). These Terms of Use ("Terms") govern your use of our website 
                    located at guzarishh.com (the "Service") operated by Guzarishh, a company registered in Dubai, UAE.
                  </p>
                  <p>
                    Our company is registered under UAE Commercial License and operates in accordance with the laws of the 
                    United Arab Emirates. By accessing or using our Service, you agree to be bound by these Terms.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold">Business Name:</h4>
                      <p>Guzarishh</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Registration:</h4>
                      <p>Dubai, United Arab Emirates</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Email:</h4>
                      <p>info@guzarishh.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Phone:</h4>
                      <p>+971 XX XXX XXXX</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p>
                    These Terms constitute a legally binding agreement between you and Guzarishh. Your continued use of the Service 
                    constitutes acceptance of these Terms and any updates or modifications.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Products and Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Guzarishh specializes in Indian women's fashion including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Sarees and traditional wear</li>
                    <li>Lehengas and bridal wear</li>
                    <li>Suits and ethnic wear</li>
                    <li>Jewelry and accessories</li>
                    <li>Casual and contemporary Indian wear</li>
                  </ul>
                  <p>
                    All products are sourced from authentic Indian manufacturers and suppliers. We strive to provide accurate 
                    product descriptions, images, and pricing, but cannot guarantee that all information is completely accurate, 
                    complete, or current.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Pricing and Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    All prices are displayed in UAE Dirhams (AED) and are inclusive of applicable taxes as per UAE regulations. 
                    Prices may change without notice, but any changes will not affect orders already confirmed.
                  </p>
                  <p>
                    We accept payments through:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Credit and debit cards (Visa, MasterCard, American Express)</li>
                    <li>Bank transfers</li>
                    <li>Digital wallets (as available)</li>
                    <li>Cash on delivery (COD) for select areas in UAE</li>
                  </ul>
                  <p>
                    All payments are processed securely through Telr payment gateway in compliance with PCI DSS standards.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Orders and Delivery</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    When you place an order, you are making an offer to purchase products from Guzarishh. We reserve the right 
                    to accept or decline your order for any reason.
                  </p>
                  <p>
                    <strong>Delivery Information:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Free delivery across UAE on orders above AED 200</li>
                    <li>Standard delivery: 3-5 business days</li>
                    <li>Express delivery: 1-2 business days (additional charges apply)</li>
                    <li>Delivery times are estimates and may vary</li>
                  </ul>
                  <p>
                    We deliver throughout the UAE. For international shipping, please contact us directly.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. User Accounts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    To access certain features of the Service, you may be required to create an account. You are responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Maintaining the confidentiality of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Providing accurate and current information</li>
                    <li>Notifying us immediately of any unauthorized use</li>
                  </ul>
                  <p>
                    We reserve the right to suspend or terminate accounts that violate these Terms.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    All content on this website, including but not limited to text, graphics, logos, images, and software, 
                    is the property of Guzarishh or its licensors and is protected by UAE and international copyright laws.
                  </p>
                  <p>
                    You may not reproduce, distribute, modify, or create derivative works from any content without our 
                    express written permission.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    To the maximum extent permitted by UAE law, Guzarishh shall not be liable for any indirect, incidental, 
                    special, consequential, or punitive damages, including without limitation, loss of profits, data, use, 
                    goodwill, or other intangible losses.
                  </p>
                  <p>
                    Our total liability to you for any damages arising from or related to these Terms or the Service shall 
                    not exceed the amount you paid to us in the 12 months preceding the claim.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Governing Law</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates. 
                    Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive 
                    jurisdiction of the courts of Dubai, UAE.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>11. Changes to Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We reserve the right to modify these Terms at any time. We will notify users of any material changes 
                    by posting the new Terms on this page and updating the "Last Updated" date.
                  </p>
                  <p>
                    Your continued use of the Service after any modifications constitutes acceptance of the updated Terms.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>12. Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    If you have any questions about these Terms of Use, please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> info@guzarishh.com</p>
                    <p><strong>Phone:</strong> +971 XX XXX XXXX</p>
                    <p><strong>Address:</strong> Dubai, United Arab Emirates</p>
                    <p><strong>Business Hours:</strong> Sunday - Thursday, 9:00 AM - 6:00 PM (UAE Time)</p>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center text-sm text-gray-500 pt-8">
                <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p>© 2024 Guzarishh. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
