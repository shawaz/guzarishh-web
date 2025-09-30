'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useConvexAuth } from '@/contexts/ConvexAuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Truck, Search, Mail, Phone, MapPin, ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  category: string
  status: 'active' | 'inactive' | 'pending'
  totalOrders: number
  lastOrder: string
  rating: number
}

const mockSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Fashion Forward Textiles',
    contactPerson: 'Ahmed Hassan',
    email: 'ahmed@fashionforward.com',
    phone: '+971 4 123 4567',
    address: 'Dubai Textile Market, Building 15, Dubai',
    category: 'Fabric Supplier',
    status: 'active',
    totalOrders: 45,
    lastOrder: '2024-01-10',
    rating: 4.8
  },
  {
    id: 'SUP-002',
    name: 'Embroidered Elegance',
    contactPerson: 'Fatima Al-Rashid',
    email: 'fatima@embroidered.com',
    phone: '+971 4 234 5678',
    address: 'Sharjah Industrial Area, Block 3, Sharjah',
    category: 'Embroidery Services',
    status: 'active',
    totalOrders: 32,
    lastOrder: '2024-01-08',
    rating: 4.6
  },
  {
    id: 'SUP-003',
    name: 'Premium Accessories Co.',
    contactPerson: 'Mohammed Ali',
    email: 'mohammed@premiumaccessories.com',
    phone: '+971 4 345 6789',
    address: 'Abu Dhabi Trade Center, Floor 2, Abu Dhabi',
    category: 'Accessories',
    status: 'active',
    totalOrders: 28,
    lastOrder: '2024-01-05',
    rating: 4.9
  },
  {
    id: 'SUP-004',
    name: 'Traditional Crafts Ltd.',
    contactPerson: 'Aisha Khan',
    email: 'aisha@traditionalcrafts.com',
    phone: '+971 4 456 7890',
    address: 'Fujairah Free Zone, Warehouse 7, Fujairah',
    category: 'Traditional Crafts',
    status: 'pending',
    totalOrders: 0,
    lastOrder: 'N/A',
    rating: 0
  },
  {
    id: 'SUP-005',
    name: 'Fast Fashion Supply',
    contactPerson: 'Omar Al-Mansouri',
    email: 'omar@fastfashion.com',
    phone: '+971 4 567 8901',
    address: 'Ras Al Khaimah Industrial Zone, RAK',
    category: 'Bulk Clothing',
    status: 'inactive',
    totalOrders: 12,
    lastOrder: '2023-12-15',
    rating: 3.2
  }
]

export default function AdminSuppliers() {
  const { user, loading, isAdmin } = useConvexAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>(mockSuppliers)

  useEffect(() => {
    if (!loading && !isAdmin()) {
      router.push('/')
    }
  }, [user, loading, isAdmin, router])

  useEffect(() => {
    const filtered = mockSuppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredSuppliers(filtered)
  }, [searchTerm])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-red-100 text-red-800'
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
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{supplier.name}</h3>
                      <p className="text-sm text-muted-foreground">{supplier.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(supplier.status)}>
                      {supplier.status.toUpperCase()}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{supplier.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{supplier.address}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-sm">
                    <p className="font-medium">Contact: {supplier.contactPerson}</p>
                    <p className="text-muted-foreground">{supplier.totalOrders} orders</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium">Rating: {supplier.rating}/5</p>
                    <p className="text-muted-foreground">
                      Last order: {supplier.lastOrder === 'N/A' ? 'Never' : new Date(supplier.lastOrder).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-16">
            <Truck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No suppliers found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first supplier'}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
