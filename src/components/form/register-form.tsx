"use client"

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginReqeust } from "@/lib/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { form } from "motion/react-client";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";


export default function RegisterForm() {

    const formSchema = z.object({
        email: z.email("Please enter your email").nonempty(),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character")
            .nonempty("Password is required")
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    // const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => console.log(data)
    function loginSubmit(data) {
        console.log('login check: ', data)
    }
    console.log(watch)

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                    <Button variant="link">Sign Up</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit(loginSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                {/* <Label htmlFor="email">Email</Label> */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display email.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* <p className="text-red-500">{errors.email?.message}</p> */}
                            </div>
                            <div className="mb-4 grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input {...register("password")}
                                    id="password" type="password" />
                                <p className="text-red-500">{errors.password?.message}</p>
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
            </CardFooter>
        </Card>
    )
}