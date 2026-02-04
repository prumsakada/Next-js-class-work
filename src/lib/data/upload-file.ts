import axios from 'axios'
import { ProductType } from './productType';

const baseApi = process.env.NEXT_PUBLIC_BEST_API

export async function uploadImageToServer(images: FormData){
    const response = await axios(`${baseApi}api/v1/files/upload`, {
        method: "POST",
        headers: {
            "Accept" : "*/*",
            "Content-Type" : "multipart/form-data"
        },
        data: images
    })
    return response;
}
export async function uploadProductToAPI(product: ProductType[]){
    const prod = await axios(`${baseApi}api/v1/products'`, {
        method: "POST",
        headers: {
            "Accept" : "*/*",
            "Content-Type" : "application/json"
        },
        data: JSON.stringify(product)
    })
    return prod;
}