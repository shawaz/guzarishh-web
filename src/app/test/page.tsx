'use client'

import { useConvexAuth } from '@/contexts/ConvexAuthContext'
import { useCart } from '@/contexts/CartContext'

export default function TestPage() {
  const { user, signIn, signOut } = useConvexAuth()
  const { items, addItem, total } = useCart()

  const testSignIn = () => {
    signIn('test@example.com', 'password')
  }

  const testAddToCart = () => {
    addItem({
      id: "1",
      name: 'Test Product',
      price: 99.99,
      image: '/test-image.jpg',
      size: 'M',
      color: 'Red'
    })
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">🧪 Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Authentication Test */}
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">🔐 Authentication Test</h2>
          {user ? (
            <div>
              <p className="mb-4">✅ Signed in as: {user.name || user.email}</p>
              <button 
                onClick={signOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div>
              <p className="mb-4">❌ Not signed in</p>
              <button 
                onClick={testSignIn}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Test Sign In
              </button>
            </div>
          )}
        </div>

        {/* Cart Test */}
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">🛒 Cart Test</h2>
          <p className="mb-2">Items in cart: {items.length}</p>
          <p className="mb-4">Total: ${total.toFixed(2)}</p>
          <button 
            onClick={testAddToCart}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Test Item
          </button>
        </div>
      </div>

      {/* Environment Check */}
      <div className="mt-8 border p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🔧 Environment Check</h2>
        <div className="space-y-2">
          <p>
            Convex URL: {process.env.NEXT_PUBLIC_CONVEX_URL ? '✅ Set' : '❌ Not set'}
          </p>
          <p>
            Auth Secret: {process.env.BETTER_AUTH_SECRET ? '✅ Set' : '❌ Not set'}
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a 
          href="/"
          className="text-blue-500 hover:text-blue-600 underline"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  )
}

