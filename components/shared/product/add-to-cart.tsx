'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Cart, CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { Minus, Plus, Loader } from "lucide-react";
import { useTransition } from "react";


const AddToCart = ({ cart,item}: { cart?:Cart; item: CartItem }) => {
  const router = useRouter()

  const [isPending,startTransition] = useTransition()


  const handleAddToCart = async () => {
    startTransition(async()=>{

      const res = await addItemToCart(item)

    if (!res.success) {
      toast.error(res.message)
      return
    }
    
    // handle success to cart
    toast.success(res.message, {
      action: {
        label: "Go To Cart",
        onClick: () => router.push("/cart"),
      },
    });

    })
    
  }

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async()=>{

    const res = await removeItemFromCart(item.productId)
    toast[res.success ? "success" : "error"](res.message)

    return;

    })
    
  }

  // Check if the item is already in the cart
  const existItem = cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button variant="outline" type="button" onClick={handleRemoveFromCart} >
        {isPending ? (<Loader className="w-4 h-4 animate-spin"/>):(
          <Minus className="h-4 w-4"/>
          )}

      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button variant="outline" type="button" onClick={handleAddToCart} >
        {isPending ? (<Loader className="w-4 h-4 animate-spin"/>):(
          <Plus className="h-4 w-4"/>
          )}      </Button>
    </div>
  ) : (

    <Button className="w-full" type="button" onClick={handleAddToCart}>
    {isPending ? (<Loader className="w-4 h-4 animate-spin"/>):(
          <Plus className="h-4 w-4"/>
          )} Add to Cart
      
    </Button>

  )

}

export default AddToCart;
