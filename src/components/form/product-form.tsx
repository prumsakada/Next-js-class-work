"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "../ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import GalleryUpload from "./file-upload"
import ImageUpload from "../file-upload/image-upload"
import { uploadImageToServer, uploadProductToAPI } from "@/lib/data/upload-file"
import { image } from "motion/react-client"
import { ProductType } from "@/lib/data/productType"

const spokenLanguages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Italian", value: "it" },
    { label: "Chinese", value: "zh" },
    { label: "Japanese", value: "ja" },
] as const

const formSchema = z.object({
    title: z
        .string()
        .min(5, "Product title must be at least 5 characters.")
        .max(32, "Product title must be at most 32 characters."),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters.")
        .max(100, "Description must be at most 100 characters."),
    price: z
        .coerce
        .number()
        .positive(),
    language: z
        .string()
        .min(1, "Please select your spoken language.")
        .refine((val) => val !== "auto", {
            message:
                "Auto-detection is not allowed. Please select a specific language.",
        }),
    image: z.any()
})

export function ProductsForm() {

    const formData = new FormData();
    const [images, setImages] = React.useState<ImageFile[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            language: "",
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        toast("You submitted the following values:", {
            description: (
                <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2",
            },
            style: {
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
        })
        for (const image of images) {
            formData.append("file", image.file)
        }
        const imageFromUpload = await uploadImageToServer(formData)
        console.log('upload To Server: ', imageFromUpload)
        data.image = imageFromUpload.data.location
        console.log('Click sunmit: ', data);

    }

    function onhandleImageChange(images: ImageFile[]) {
        setImages(images);
    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Add Product</CardTitle>
                <CardDescription>
                    Fill in the details to add a new product to your catalog.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Product Title
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter product title"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        {/* description */}
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-description">
                                        Description
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="form-rhf-demo-description"
                                            placeholder="Describe the product in detail."
                                            rows={6}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value.length}/100 characters
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <FieldDescription>
                                        Provide a detailed description of the product.
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        {/* price */}
                        <Controller
                            name="price"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-price">
                                        Price
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        id="form-rhf-demo-price"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="200 USD"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        {/* end of products */}

                        <Card className="w-full sm:max-w-lg">
                            <CardHeader>
                                <CardTitle>Language Preferences</CardTitle>
                                <CardDescription>
                                    Select your preferred spoken language.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FieldGroup>
                                    <Controller
                                        name="language"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                orientation="responsive"
                                                data-invalid={fieldState.invalid}
                                            >
                                                <FieldContent>
                                                    <FieldLabel htmlFor="form-rhf-select-category">
                                                        Spoken Language
                                                    </FieldLabel>
                                                    <FieldDescription>
                                                        For best results, select the language you speak.
                                                    </FieldDescription>
                                                    {fieldState.invalid && (
                                                        <FieldError errors={[fieldState.error]} />
                                                    )}
                                                </FieldContent>
                                                <Select
                                                    name={field.name}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger
                                                        id="form-rhf-select-language"
                                                        aria-invalid={fieldState.invalid}
                                                        className="min-w-[120px]"
                                                    >
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent position="item-aligned">
                                                        {spokenLanguages.map((language) => (
                                                            <SelectItem key={language.value} value={language.value}>
                                                                {language.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                            </CardContent>
                            <CardFooter>
                                <Field orientation="horizontal">
                                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                                        Reset
                                    </Button>
                                    <Button type="submit">
                                        Save
                                    </Button>
                                </Field>
                            </CardFooter>
                        </Card>
                    </FieldGroup>
                    {/* end of select */}
                    <Controller
                        name="image"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-image">
                                    Image Upload
                                </FieldLabel>
                                <ImageUpload
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    onImagesChange={onhandleImageChange}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" form="form-rhf-demo">
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
