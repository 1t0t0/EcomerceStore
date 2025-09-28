'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Cart, CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { Minus, Plus } from "lucide-react";


const AddToCart = ({ cart,item}: { cart?:Cart; item: CartItem }) => {
  const router = useRouter()

  const handleAddToCart = async () => {
    const res = await addItemToCart(item)

    if (!res.success) {
   
      toast.error(res.message)
      return
    }

    toast.success(res.message, {
      action: {
        label: "Go To Cart",
        onClick: () => router.push("/cart"),
      },
    })
  }

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    const res = await removeItemFromCart(item.productId)
    
    toast[res.success ? "success" : "error"](res.message)

    return;
  }

  // Check if the item is already in the cart
  const existItem = cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button variant="outline" type="button" onClick={handleRemoveFromCart} >
        <Minus className="h-4 w-4"/>

      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button variant="outline" type="button" onClick={handleAddToCart} >
        <Plus className="h-4 w-4"/>
      </Button>
    </div>
  ) : (

    <Button className="w-full" type="button" onClick={handleAddToCart}>
    <Plus/>Add to Cart
      
    </Button>

  )

}

export default AddToCart;
