'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.action";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter()

  const handleAddToCart = async () => {
    const res = await addItemToCart(item)

    if (!res.success) {
   
      toast.error(res.message)
      return
    }

    toast.success(`${item.name} added to cart`, {
      action: {
        label: "Go To Cart",
        onClick: () => router.push("/cart"),
      },
    })
  }

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  )
}

export default AddToCart;
