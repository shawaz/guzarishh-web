import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl text-gray-600">
                We'd love to hear from you. Get in touch with our team!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name *</label>
                        <Input placeholder="Enter your first name" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name *</label>
                        <Input placeholder="Enter your last name" required />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input type="email" placeholder="Enter your email" required />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input type="tel" placeholder="+971 XX XXX XXXX" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject *</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="order">Order Support</option>
                        <option value="return">Return/Exchange</option>
                        <option value="product">Product Question</option>
                        <option value="wholesale">Wholesale Inquiry</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <textarea 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md h-32 resize-none"
                        placeholder="Tell us how we can help you..."
                        required
                      ></textarea>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold">Email</h4>
                        <p className="text-gray-600">info@guzarishh.com</p>
                        <p className="text-gray-600">support@guzarishh.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold">Phone</h4>
                        <p className="text-gray-600">+971 XX XXX XXXX</p>
                        <p className="text-gray-600">WhatsApp: +971 XX XXX XXXX</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold">Address</h4>
                        <p className="text-gray-600">
                          Guzarishh<br />
                          Dubai, United Arab Emirates
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold">Business Hours</h4>
                        <p className="text-gray-600">
                          Sunday - Thursday: 9:00 AM - 6:00 PM<br />
                          Friday: 2:00 PM - 6:00 PM<br />
                          Saturday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Us Now
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp Chat
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <Card className="mt-12">
              <CardHeader>
                <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-2">How long does shipping take?</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Standard shipping takes 3-5 business days across the UAE. Express shipping is available for faster delivery.
                    </p>
                    
                    <h4 className="font-semibold mb-2">Do you offer returns?</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Yes, we offer a 30-day return policy. Items must be in original condition with tags attached.
                    </p>
                    
                    <h4 className="font-semibold mb-2">Are your products authentic?</h4>
                    <p className="text-sm text-gray-600">
                      Yes, all our products are sourced directly from authentic Indian manufacturers and artisans.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      We accept all major credit cards, bank transfers, and cash on delivery (COD) in select areas.
                    </p>
                    
                    <h4 className="font-semibold mb-2">Do you ship internationally?</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Yes, we ship to select international destinations. Contact us for specific shipping rates.
                    </p>
                    
                    <h4 className="font-semibold mb-2">Can I get custom sizing?</h4>
                    <p className="text-sm text-gray-600">
                      Yes, we offer custom sizing for select products. Custom orders take 2-3 weeks for completion.
                    </p>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <Button variant="outline">
                    View All FAQs
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-center">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-6">
                  <Button variant="outline" size="lg">
                    Instagram
                  </Button>
                  <Button variant="outline" size="lg">
                    Facebook
                  </Button>
                  <Button variant="outline" size="lg">
                    Twitter
                  </Button>
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">
                  Stay updated with our latest collections and offers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
