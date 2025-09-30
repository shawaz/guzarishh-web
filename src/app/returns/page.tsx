import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, RefreshCw, Clock, Shield, Truck } from 'lucide-react'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Return & Exchange Policy</h1>
            
            {/* Quick Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">30 Days</h3>
                  <p className="text-sm text-gray-600">Return Window</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Original Condition</h3>
                  <p className="text-sm text-gray-600">Items Must Be Unworn</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Truck className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Free Returns</h3>
                  <p className="text-sm text-gray-600">On Orders Above AED 200</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <RefreshCw className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Easy Exchange</h3>
                  <p className="text-sm text-gray-600">Size or Color Change</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Return Policy Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    At Guzarishh, we want you to be completely satisfied with your purchase. We offer a comprehensive 
                    return and exchange policy that complies with UAE consumer protection laws and regulations.
                  </p>
                  <p>
                    Our return policy is designed to be customer-friendly while ensuring the quality and authenticity 
                    of our Indian women's fashion products.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Return Timeframe</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">30-Day Return Window</h4>
                    <p>
                      You have <strong>30 days from the delivery date</strong> to initiate a return or exchange. 
                      This timeframe complies with UAE Federal Law No. 15 of 2020 on Consumer Protection.
                    </p>
                  </div>
                  <p>
                    <strong>Important:</strong> The return period starts from the date of delivery, not the purchase date. 
                    Please keep your delivery confirmation for reference.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Eligible Items for Return</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">✅ Items Eligible for Return:</h4>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>All clothing items (sarees, lehengas, suits, kurtis)</li>
                      <li>Accessories and jewelry</li>
                      <li>Items with manufacturing defects</li>
                      <li>Items damaged during shipping</li>
                      <li>Wrong items sent by us</li>
                      <li>Size exchanges (subject to availability)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">❌ Items NOT Eligible for Return:</h4>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Custom-made or personalized items</li>
                      <li>Items worn, used, or damaged by the customer</li>
                      <li>Items without original tags and packaging</li>
                      <li>Items returned after 30 days</li>
                      <li>Items purchased during final sale or clearance</li>
                      <li>Underwear and intimate wear (for hygiene reasons)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Return Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    To be eligible for a return, items must meet the following conditions:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Original Condition:</strong> Items must be unworn, unwashed, and in original condition</li>
                    <li><strong>Original Packaging:</strong> All original tags, labels, and packaging must be intact</li>
                    <li><strong>Proof of Purchase:</strong> Valid order number or receipt required</li>
                    <li><strong>No Damage:</strong> Items must not be damaged, stained, or altered</li>
                    <li><strong>Complete Set:</strong> All components of the item must be included (e.g., blouse piece with saree)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. How to Initiate a Return</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Step 1: Contact Us</h4>
                      <p className="mb-2">Reach out to us within 30 days of delivery:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Email: returns@guzarishh.com</li>
                        <li>Phone: +971 XX XXX XXXX</li>
                        <li>WhatsApp: +971 XX XXX XXXX</li>
                        <li>Online form: Contact us page</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Step 2: Provide Information</h4>
                      <p className="mb-2">Please provide the following information:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Order number and date</li>
                        <li>Item(s) you want to return</li>
                        <li>Reason for return</li>
                        <li>Preferred resolution (refund or exchange)</li>
                        <li>Photos of the item (if applicable)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Step 3: Get Authorization</h4>
                      <p>We will review your request and provide a Return Authorization Number (RAN) if approved.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Step 4: Package and Ship</h4>
                      <p>Package the item securely and ship it to our return address using the provided RAN.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Return Shipping</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-green-800">Free Returns</h4>
                      <p className="text-sm text-green-700">
                        Free return shipping for orders above AED 200 or items with defects/wrong items sent by us.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-blue-800">Paid Returns</h4>
                      <p className="text-sm text-blue-700">
                        Return shipping costs AED 25 for orders below AED 200 and change of mind returns.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Return Address:</h4>
                    <p className="text-sm">
                      Guzarishh Returns Department<br />
                      [Return Address]<br />
                      Dubai, United Arab Emirates<br />
                      <strong>Important:</strong> Always include your RAN on the package
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Refund Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Processing Time:</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>Inspection:</strong> 2-3 business days after receipt</li>
                        <li><strong>Approval:</strong> 1 business day after inspection</li>
                        <li><strong>Refund Processing:</strong> 3-5 business days</li>
                        <li><strong>Total Time:</strong> 5-10 business days</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Refund Methods:</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Original payment method (credit/debit card)</li>
                        <li>Bank transfer (for bank payments)</li>
                        <li>Store credit (customer request)</li>
                        <li>Cash refund (for COD orders, in-store only)</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Refund Amount:</h4>
                      <p className="text-sm">
                        Refunds include the item price and original shipping cost (if applicable). 
                        Return shipping costs are only refunded for defective or wrong items.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Exchange Policy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We offer exchanges for size or color changes, subject to availability:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Exchanges must be requested within 30 days of delivery</li>
                    <li>Items must be in original condition with all tags attached</li>
                    <li>Price difference (if any) will be charged or refunded</li>
                    <li>Exchange shipping is free for orders above AED 200</li>
                    <li>Processing time: 5-7 business days</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Damaged or Defective Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    If you receive a damaged or defective item, we will provide immediate resolution:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Contact us within 48 hours of delivery</li>
                    <li>Provide photos of the damage/defect</li>
                    <li>Free return shipping and full refund</li>
                    <li>Priority processing (2-3 business days)</li>
                    <li>Apology discount for future purchases</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. UAE Consumer Rights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Our return policy complies with UAE Federal Law No. 15 of 2020 on Consumer Protection:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Right to return goods within 14 days (we offer 30 days)</li>
                    <li>Right to refund for defective goods</li>
                    <li>Right to exchange for non-conforming goods</li>
                    <li>Right to compensation for damages</li>
                    <li>Right to clear product information</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>11. International Returns</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    For international customers outside the UAE:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Return shipping costs are customer responsibility</li>
                    <li>Customs duties and taxes are non-refundable</li>
                    <li>Processing time may be longer (7-14 business days)</li>
                    <li>International shipping restrictions may apply</li>
                    <li>Contact us before initiating international returns</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>12. Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    For any questions about returns or exchanges, please contact us:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Returns Department</h4>
                      <p className="text-sm"><strong>Email:</strong> returns@guzarishh.com</p>
                      <p className="text-sm"><strong>Phone:</strong> +971 XX XXX XXXX</p>
                      <p className="text-sm"><strong>WhatsApp:</strong> +971 XX XXX XXXX</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Business Hours</h4>
                      <p className="text-sm">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                      <p className="text-sm">Friday: 2:00 PM - 6:00 PM</p>
                      <p className="text-sm">Saturday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center pt-8">
                <Button size="lg" className="mr-4">
                  Start Return Process
                </Button>
                <Button variant="outline" size="lg">
                  Contact Support
                </Button>
              </div>

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
