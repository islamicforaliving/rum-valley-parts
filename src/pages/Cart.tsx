import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart'
import { formatPrice } from '@/lib/catalog'

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, total, itemCount } = useCart()
  const shipping = total() > 100 ? 0 : 15
  const tax = total() * 0.06
  const grandTotal = total() + shipping + tax

  if (items.length === 0) {
    return (
      <div className="container min-h-[60vh] flex flex-col items-center justify-center py-24">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some parts to get started</p>
        <Button asChild className="mt-6">
          <Link to="/catalog">Browse Catalog</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="font-display text-3xl font-bold">Shopping Cart</h1>
      <p className="mt-2 text-muted-foreground">{itemCount()} items</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 border rounded-lg p-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-24 w-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground">{item.product.sku}</p>
                <p className="mt-1 font-bold text-primary">{formatPrice(item.product.memberPrice)}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="p-2 hover:bg-destructive/10 rounded-full"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
                <div className="flex items-center gap-2 border rounded">
                  <button
                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    className="p-2 hover:bg-muted"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-2 hover:bg-muted"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={clearCart} className="mt-4">
            Clear Cart
          </Button>
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg p-6 h-fit">
          <h2 className="font-display text-xl font-bold">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(total())}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (6%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
          {shipping > 0 && (
            <p className="mt-3 text-xs text-muted-foreground">
              Free shipping on orders over $100
            </p>
          )}
          <Button asChild className="w-full mt-6" size="lg">
            <Link to="/checkout">
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}