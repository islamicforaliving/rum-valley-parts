import { CheckCircle, Truck, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function OrderConfirmation() {
  return (
    <div className="container min-h-[60vh] flex flex-col items-center justify-center py-24">
      <div className="text-center max-w-md">
        <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Order Confirmed!</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you for your order. Your parts are being prepared for shipment.
        </p>
        <div className="mt-8 space-y-3">
          <Button asChild size="lg" className="w-full">
            <Link to="/orders">View Order Details</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link to="/catalog">Continue Shopping</Link>
          </Button>
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Truck className="h-4 w-4" />
          <span>Free shipping on orders over $100</span>
        </div>
      </div>
    </div>
  )
}
