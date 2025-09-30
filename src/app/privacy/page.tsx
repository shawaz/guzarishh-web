import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Introduction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Guzarishh ("we," "our," or "us") is committed to protecting your privacy and personal information. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                    visit our website guzarishh.com and use our services.
                  </p>
                  <p>
                    This Privacy Policy complies with the UAE Federal Law No. 2 of 2019 Concerning the Use of Information 
                    and Communication Technology in Health Fields, and other applicable UAE privacy laws, as well as 
                    international standards including GDPR where applicable.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Personal Information:</h4>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Name and contact information (email, phone number)</li>
                      <li>Billing and shipping addresses</li>
                      <li>Payment information (processed securely through Telr)</li>
                      <li>Account credentials and preferences</li>
                      <li>Order history and purchase records</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Technical Information:</h4>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>IP address and device information</li>
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>Website usage patterns and analytics</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Communication Data:</h4>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Customer service interactions</li>
                      <li>Feedback and reviews</li>
                      <li>Marketing preferences</li>
                      <li>Social media interactions</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>We use your personal information for the following purposes:</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Service Provision:</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Processing and fulfilling your orders</li>
                        <li>Managing your account and preferences</li>
                        <li>Providing customer support</li>
                        <li>Processing payments securely</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Communication:</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Sending order confirmations and updates</li>
                        <li>Providing shipping notifications</li>
                        <li>Responding to inquiries and support requests</li>
                        <li>Sending marketing communications (with consent)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Business Operations:</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Analyzing website usage and performance</li>
                        <li>Improving our products and services</li>
                        <li>Conducting market research</li>
                        <li>Preventing fraud and ensuring security</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Legal Compliance:</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Complying with UAE laws and regulations</li>
                        <li>Maintaining business records</li>
                        <li>Responding to legal requests</li>
                        <li>Protecting our rights and interests</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Legal Basis for Processing (GDPR Compliance)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>For EU residents, we process your personal data based on the following legal grounds:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Contract Performance:</strong> Processing necessary for order fulfillment and service delivery</li>
                    <li><strong>Legitimate Interest:</strong> Business operations, fraud prevention, and service improvement</li>
                    <li><strong>Consent:</strong> Marketing communications and optional data collection</li>
                    <li><strong>Legal Obligation:</strong> Compliance with applicable laws and regulations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Information Sharing and Disclosure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>We may share your information in the following circumstances:</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Service Providers:</h4>
                      <p className="text-sm ml-4">Third-party companies that help us operate our business, including:</p>
                      <ul className="list-disc list-inside space-y-1 ml-8 text-sm">
                        <li>Payment processors (Telr)</li>
                        <li>Shipping and logistics partners</li>
                        <li>Email and communication services</li>
                        <li>Analytics and marketing tools</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Legal Requirements:</h4>
                      <p className="text-sm ml-4">When required by law or to protect our rights, including:</p>
                      <ul className="list-disc list-inside space-y-1 ml-8 text-sm">
                        <li>Court orders or legal processes</li>
                        <li>Government investigations</li>
                        <li>Fraud prevention</li>
                        <li>Safety and security protection</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Business Transfers:</h4>
                      <p className="text-sm ml-4">In connection with mergers, acquisitions, or asset sales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Data Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure payment processing through PCI DSS compliant systems</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication measures</li>
                    <li>Staff training on data protection</li>
                    <li>Incident response procedures</li>
                  </ul>
                  <p>
                    However, no method of transmission over the internet or electronic storage is 100% secure. 
                    While we strive to protect your information, we cannot guarantee absolute security.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Cookies and Tracking Technologies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We use cookies and similar technologies to enhance your browsing experience:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Essential Cookies:</h4>
                      <p className="text-sm ml-4">Required for website functionality, shopping cart, and security</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Analytics Cookies:</h4>
                      <p className="text-sm ml-4">Help us understand website usage and improve performance</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Marketing Cookies:</h4>
                      <p className="text-sm ml-4">Used for personalized advertising and content (with consent)</p>
                    </div>
                  </div>

                  <p>
                    You can control cookie settings through your browser preferences. Note that disabling certain 
                    cookies may affect website functionality.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Your Rights and Choices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Depending on your location, you may have the following rights:</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Access and Portability:</h4>
                      <p className="text-sm ml-4">Request access to and copies of your personal information</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Correction:</h4>
                      <p className="text-sm ml-4">Request correction of inaccurate or incomplete information</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Deletion:</h4>
                      <p className="text-sm ml-4">Request deletion of your personal information (subject to legal obligations)</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Restriction:</h4>
                      <p className="text-sm ml-4">Request restriction of processing in certain circumstances</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Objection:</h4>
                      <p className="text-sm ml-4">Object to processing based on legitimate interests or for marketing</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Marketing Opt-out:</h4>
                      <p className="text-sm ml-4">Unsubscribe from marketing communications at any time</p>
                    </div>
                  </div>

                  <p>
                    To exercise these rights, please contact us using the information provided in the Contact section.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Data Retention</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                    Privacy Policy, unless a longer retention period is required or permitted by law:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Account Information:</strong> Until account deletion or 3 years of inactivity</li>
                    <li><strong>Order Records:</strong> 7 years for tax and legal compliance</li>
                    <li><strong>Marketing Data:</strong> Until consent is withdrawn or 3 years of inactivity</li>
                    <li><strong>Customer Service:</strong> 3 years from last interaction</li>
                    <li><strong>Analytics Data:</strong> Aggregated data may be retained longer</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. International Data Transfers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Your information may be transferred to and processed in countries other than your own. We ensure 
                    appropriate safeguards are in place for such transfers, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Standard contractual clauses approved by relevant authorities</li>
                    <li>Adequacy decisions by competent data protection authorities</li>
                    <li>Certification schemes and codes of conduct</li>
                    <li>Other legally recognized transfer mechanisms</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>11. Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Our Service is not intended for children under 13 years of age. We do not knowingly collect 
                    personal information from children under 13. If you are a parent or guardian and believe your 
                    child has provided us with personal information, please contact us immediately.
                  </p>
                  <p>
                    If we discover that we have collected personal information from a child under 13 without 
                    parental consent, we will delete such information from our systems.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>12. Changes to Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any material changes 
                    by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                  </p>
                  <p>
                    We encourage you to review this Privacy Policy periodically for any changes. Your continued use 
                    of the Service after any modifications constitutes acceptance of the updated Privacy Policy.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>13. Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Data Protection Officer:</strong> Guzarishh Privacy Team</p>
                    <p><strong>Email:</strong> privacy@guzarishh.com</p>
                    <p><strong>General Contact:</strong> info@guzarishh.com</p>
                    <p><strong>Phone:</strong> +971 XX XXX XXXX</p>
                    <p><strong>Address:</strong> Dubai, United Arab Emirates</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    We will respond to your inquiry within 30 days of receipt.
                  </p>
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
