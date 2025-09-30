'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useConvexAuth } from '@/contexts/ConvexAuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Search, Eye, ArrowLeft, Filter } from 'lucide-react'
import Link from 'next/link'

interface Order {
  id: string
  customerName: string
  customerEmail: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: number
  date: string
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Sarah Ahmed',
    customerEmail: 'sarah@example.com',
    total: 299,
    status: 'pending',
    items: 2,
    date: '2024-01-15'
  },
  {
    id: 'ORD-002',
    customerName: 'Fatima Al-Zahra',
    customerEmail: 'fatima@example.com',
    total: 599,
    status: 'processing',
    items: 1,
    date: '2024-01-14'
  },
  {
    id: 'ORD-003',
    customerName: 'Aisha Khan',
    customerEmail: 'aisha@example.com',
    total: 899,
    status: 'shipped',
    items: 3,
    date: '2024-01-13'
  },
  {
    id: 'ORD-004',
    customerName: 'Zainab Ali',
    customerEmail: 'zainab@example.com',
    total: 1299,
    status: 'delivered',
    items: 1,
    date: '2024-01-12'
  },
  {
    id: 'ORD-005',
    customerName: 'Maryam Hassan',
    customerEmail: 'maryam@example.com',
    total: 199,
    status: 'cancelled',
    items: 1,
    date: '2024-01-11'
  }
]

export default function AdminOrders() {
  const { user, loading, isAdmin } = useConvexAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders)

  useEffect(() => {
    if (!loading && !isAdmin()) {
      router.push('/')
    }
  }, [user, loading, isAdmin, router])

  useEffect(() => {
    const filtered = mockOrders.filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredOrders(filtered)
  }, [searchTerm])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin()) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
            <CardDescription>All customer orders and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold">AED {order.total}</p>
                      <p className="text-sm text-muted-foreground">{order.items} items</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search terms' : 'Orders will appear here when customers make purchases'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
