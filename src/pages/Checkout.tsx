import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCart } from '@/lib/cart'
import { formatPrice } from '@/lib/catalog'
import { toast } from 'sonner'

export default function Checkout() {
  const { items, clearCart, total } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const shipping = total() > 100 ? 0 : 15
  const tax = total() * 0.06
  const grandTotal = total() + shipping + tax

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    // For MVP demo - simulate successful checkout
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success('Order placed successfully!')
    clearCart()
    navigate('/order-confirmation')
  }

  return (
    <div className="container py-12">
      <h1 className="font-display text-3xl font-bold">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold">
              <Truck className="h-5 w-5" />
              Shipping Information
            </h2>
            <div className="mt-4 grid gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="address1">Address</Label>
                <Input id="address1" name="address1" required placeholder="123 Main St" />
              </div>
              <div>
                <Label htmlFor="address2">Apt/Suite (optional)</Label>
                <Input id="address2" name="address2" placeholder="Unit 4" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" required placeholder="Chicago" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" required placeholder="IL" maxLength={2} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" name="zip" required placeholder="60007" maxLength={5} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" required placeholder="(224) 423-8860" />
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Demo mode - no real payment will be processed
            </p>
            <div className="mt-4 p-4 bg-muted rounded text-sm space-y-1">
              <p><strong>Test Card:</strong> 4242 4242 4242 4242</p>
              <p><strong>Expiry:</strong> 12/34</p>
              <p><strong>CVC:</strong> 123</p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 h-fit">
          <h2 className="font-display text-xl font-bold">Order Summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="line-clamp-1">{item.product.name}</span>
                <span>{formatPrice(item.product.memberPrice * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatPrice(total())}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
          <Button type="submit" className="w-full mt-6" size="lg" disabled={loading}>
            {loading ? 'Processing...' : `Pay ${formatPrice(grandTotal)}`}
          </Button>
          <p className="mt-3 text-xs text-center text-muted-foreground">
            Secure checkout powered by Stripe
          </p>
        </div>
      </form>
    </div>
  )
}
