'use client'

import { toast } from "sonner";
import { useTransition } from "react";
import { ShippingAddress } from "@/types";
import { shippingAddressSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { shippingAddressDefaultValues } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: address || shippingAddressDefaultValues,
    });

    const onSubmit = (values) => {
      console.log(values);

      return;
    }

    return (
        <div className="max-w-md mx-auto space-y-4">
            <div className="h2-bold mt-4">Shipping Address</div>
            <p className="text-sm text-muted-foreground">
                Please enter an address to ship to
            </p>

            <Form {...form}>
                <form method = 'post' onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Enter full name" 
                                        {...field} 
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="streetAddress"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Enter address" 
                                        {...field} 
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Enter city" 
                                        {...field} 
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Enter postal code" 
                                        {...field} 
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Enter country" 
                                        {...field} 
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="flex gap2">
                      <Button type="submit" disabled={isPending}>
                        {isPending ? (
                          <Loader className="w-4 h-4 animate-spin"/>
                        ):(
                          <ArrowRight className="w-4 h-4"/>
                        )}{" "}
                        Continue
                      </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ShippingAddressForm;