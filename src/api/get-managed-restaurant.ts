import { api } from "@/lib/axios";

interface GetManagedRestaurantResponse {
    id: string
    name : string 
    createdAt: Date | null
    updatedAt: Date | null
    description: string | null
    managerId: string | null
}

export async function GetManagedRestaurant(): Promise<GetManagedRestaurantResponse>{
    const response = await api.get('/managed-restaurant')

    return response.data
}

//promise vindo para tipar as variaveis de retorno