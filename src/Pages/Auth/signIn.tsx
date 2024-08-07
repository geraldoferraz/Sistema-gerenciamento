import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaSpinner } from "react-icons/fa";

import { Helmet } from "react-helmet-async"

import { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme/theme-toggle";


const signInForm = z.object({
    email: z.string().email()
})


type SignInForm = z.infer<typeof signInForm>

export function SignIn(){

    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>()

    async function handleSignIn(data: SignInForm){
        try{
            setIsLoading(true)
            console.log(data)
            await new Promise((resolve) => setTimeout(resolve, 2500))
            toast.success('Enviamos um link de authenticação para seu email.', {
                action: {
                    label: "Reenviar link",
                    onClick: () => handleSignIn(data)
                }
            })

        } catch(error){
            toast.error('Credenciais inválidas.')
            throw new Error()
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <>
            <Helmet title="Login"/>
            <div className="p-8">
                {/* o asChild passa todos as estilizacoes do button para oque esta dentro dele, nesse caso, o Link*/}
                <Button asChild className="absolute right-20 top-8"> 
                    <Link to="/sign-up" className="">
                        Novo estabelecimento
                    </Link>
                </Button>
                <div className="absolute right-4 top-8">
                    <ThemeToggle />
                </div>

                <div className="w-[350px] flex flex-col justify-center gap-6" >
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Acessar Painel</h1>
                        <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro!</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>

                        <Button disabled={isSubmitting || isLoading} type="submit" className="w-full flex items-center justify-center">
                            {isLoading ? <FaSpinner className="animate-spin" /> : 'Acessar painel'}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}