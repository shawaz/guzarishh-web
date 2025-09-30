'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useConvexAuth } from '@/contexts/ConvexAuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Users, Search, Mail, Phone, Calendar, ArrowLeft, MoreVertical } from 'lucide-react'
import Link from 'next/link'

interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  status: 'active' | 'inactive' | 'vip'
  joinDate: string
}

const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Sarah Ahmed',
    email: 'sarah@example.com',
    phone: '+971 50 123 4567',
    totalOrders: 12,
    totalSpent: 3599,
    lastOrder: '2024-01-15',
    status: 'vip',
    joinDate: '2023-06-15'
  },
  {
    id: 'CUST-002',
    name: 'Fatima Al-Zahra',
    email: 'fatima@example.com',
    phone: '+971 50 234 5678',
    totalOrders: 8,
    totalSpent: 2399,
    lastOrder: '2024-01-14',
    status: 'active',
    joinDate: '2023-08-20'
  },
  {
    id: 'CUST-003',
    name: 'Aisha Khan',
    email: 'aisha@example.com',
    phone: '+971 50 345 6789',
    totalOrders: 5,
    totalSpent: 1299,
    lastOrder: '2024-01-13',
    status: 'active',
    joinDate: '2023-10-10'
  },
  {
    id: 'CUST-004',
    name: 'Zainab Ali',
    email: 'zainab@example.com',
    phone: '+971 50 456 7890',
    totalOrders: 3,
    totalSpent: 899,
    lastOrder: '2024-01-12',
    status: 'active',
    joinDate: '2023-11-05'
  },
  {
    id: 'CUST-005',
    name: 'Maryam Hassan',
    email: 'maryam@example.com',
    phone: '+971 50 567 8901',
    totalOrders: 1,
    totalSpent: 199,
    lastOrder: '2024-01-11',
    status: 'inactive',
    joinDate: '2024-01-01'
  }
]

export default function AdminCustomers() {
  const { user, loading, isAdmin } = useConvexAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockCustomers)

  useEffect(() => {
    if (!loading && !isAdmin()) {
      router.push('/')
    }
  }, [user, loading, isAdmin, router])

  useEffect(() => {
    const filtered = mockCustomers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCustomers(filtered)
  }, [searchTerm])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip': return 'bg-purple-100 text-purple-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
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
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground">{customer.id}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{customer.email}</span>
                </div>
                {customer.phone && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date(customer.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm">
                    <p className="font-medium">{customer.totalOrders} orders</p>
                    <p className="text-muted-foreground">AED {customer.totalSpent} spent</p>
                  </div>
                  <Badge className={getStatusColor(customer.status)}>
                    {customer.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Last order: {new Date(customer.lastOrder).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No customers found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search terms' : 'Customer data will appear here'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
