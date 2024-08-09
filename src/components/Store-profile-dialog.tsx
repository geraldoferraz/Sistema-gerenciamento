import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { GetManagedRestaurant } from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";


const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string()
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>


export function StoreProfileDialog(){

    const queryClient = useQueryClient()

    const [isLoading, setIsLoading] = useState(false)

    const { data: managedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: GetManagedRestaurant,
        staleTime: Infinity
    });

    const { register, handleSubmit } = useForm<StoreProfileSchema>({
        resolver: zodResolver(storeProfileSchema),
        values: {
            name: managedRestaurant?.name ?? '',
            description: managedRestaurant?.description ?? ''
        }
    })

    function updateManagedRestaurantCache({ name, description }: StoreProfileSchema){
        const cached = queryClient.getQueryData<StoreProfileSchema>(['managed-restaurant'])

        if(cached){
            const updatedProfile = {
                ...cached,
                name,
                description
            };

            queryClient.setQueryData(['managed-restaurant'], updatedProfile)
            return updatedProfile;
        }

        return cached;
    }

    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updateProfile,
        onMutate({ name, description }){
            const cached = updateManagedRestaurantCache({ name, description })

            return { previousProfile: cached }
        },
        onError(_, __, context) {
            if(context?.previousProfile){
                updateManagedRestaurantCache(context.previousProfile)
            }
        },
    })

    async function handleUpdateProfile(data: StoreProfileSchema){
        try{
            setIsLoading(true)
            await updateProfileFn({
                name: data.name,
                description: data.description
            })

            toast.success('Perfil atualizado com sucesso!')

        } catch (error){
            toast.error('Falha ao atualizar o perfil. Tente novamente mais tarde.')
            throw new Error()
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>Atualize as informações do seu estabelecimento</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">Nome</Label>
                        <Input className="col-span-3" id="name" {...register('name')}/>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="description">Descrição</Label>
                        <Textarea className="col-span-3" id="description" {...register('description')}/>
                    </div>
                </div>

                <DialogFooter>
                    <Button type="submit" variant="success">
                        {isLoading ? <FaSpinner className="animate-spin h-4 w-4" /> : "Salvar"}
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">Cancelar</Button>
                    </DialogClose>
                </DialogFooter>w
            </form>
        </DialogContent>
    )
}
