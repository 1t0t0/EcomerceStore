'use client';

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { use, useTransition } from "react";
import { addItemToCart,removeItemFromCart } from "@/lib/actions/cart.action";
import { ArrowRight,Loader,Minus,Plus } from "lucide-react";
import { Cart } from "@/types";
import Link from "next/link";
import Image from "next/image";
import {Table,TableBody,TableHead,TableHeader,TableRow,TableCell} from '@/components/ui/table'
import { Button } from "@/components/ui/button";

const CartTable = ({cart}: {cart?: Cart}) => {

    const router = useRouter()
    const [isPending,startTransition] = useTransition()


    return ( 
    <>
    <h1 className="py-4 h2-bold">Shopping Cart</h1>
    {!cart || cart.items.length === 0 ? (
        <div>
            Cart is empty.{" "}
            <Link href="/" className="underline">
                Go shopping
            </Link>
        </div>
    ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cart.items.map((Item)=>(
                            <TableRow key={Item.slug}>
                                <TableCell>
                                    <Link href={`/product/${Item.slug}`} className="flex items-center">
                                    <Image src={Item.image} alt={Item.name} width={50} height={50}/>
                                    <span className="px-2">{Item.name}</span>
                                    </Link>
                                </TableCell>
                                <TableCell className="flex-center gap-2">
                                    <Button disabled={isPending} variant='outline' type="button" onClick={()=> startTransition(async()=>{
                                        const res = await removeItemFromCart(Item.productId)

                                        if(!res.success){
                                            toast.error(res.message)
                                        }
                                    })} >
                                        {isPending ? (
                                            <Loader className="w-4 h-4 animate-spin"></Loader>
                                        ):(
                                        <Minus className="w-4 h-4"/>
                                        )}
                                    </Button>
                                    <span>{Item.qty}</span>
                                    <Button disabled={isPending} variant='outline' type="button" onClick={()=> startTransition(async()=>{
                                        const res = await addItemToCart(Item)

                                        if(!res.success){
                                            toast.error(res.message)
                                        }
                                    })} >
                                        {isPending ? (
                                            <Loader className="w-4 h-4 animate-spin"></Loader>
                                        ):(
                                        <Plus className="w-4 h-4"/>
                                        )}
                                    </Button>

                                </TableCell>
                                <TableCell className="text-right">${Item.price}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )}
    </>
     );
}
 
export default CartTable;