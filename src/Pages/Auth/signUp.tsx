import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaSpinner } from "react-icons/fa";

import { Helmet } from "react-helmet-async"

import { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/sign-up";


const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email(),
})


type SignUpForm = z.infer<typeof signUpForm>

export function SignUp(){

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()

    const { mutateAsync: registerRestaurant } = useMutation({
        mutationFn: signUp
    })

    async function handleSignUp(data: SignUpForm){
        try{
            setIsLoading(true)
            console.log(data)

            await registerRestaurant({ 
                restaurantName: data.restaurantName,
                managerName: data.managerName,
                email: data.email,
                phone: data.phone,
            })

            toast.success('Restaurante cadastrado com sucesso!', {
                action: {
                    label: 'Faça agora seu login',
                    onClick: () => navigate(`/sign-in?email=${data.email}`) //passamos o email do user na url de sign-in
                }
            })

        } catch(error){
            toast.error('Error ao cadastrar restaurante.')
            throw new Error()
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <>
            <Helmet title="Cadastro"/>
            <div className="p-8">

                <Button asChild className="absolute right-20 top-8"> 
                    <Link to="/sign-in" className="">
                        Fazer login
                    </Link>
                </Button>
                <div className="absolute right-4 top-8">
                    <ThemeToggle />
                </div>

                <div className="w-[350px] flex flex-col justify-center gap-6" >
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Criar conta grátis</h1>
                        <p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
                        <div className="space-y-2">
                            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                            <Input id="restaurantName" type="text" {...register('restaurantName')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="managerName">Nome completo</Label>
                            <Input id="managerName" type="text" {...register('managerName')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Celular</Label>
                            <Input id="phone" type="tel" {...register('phone')} />
                        </div>

                        <Button disabled={isSubmitting || isLoading} type="submit" className="w-full flex items-center justify-center">
                            {isLoading ? <FaSpinner className="animate-spin" /> : 'Finalizar cadatro'}
                        </Button>

                        <p className="px-6 pt-2 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar, você concorda com nossos termos de serviço e políticas de privacidade.
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}