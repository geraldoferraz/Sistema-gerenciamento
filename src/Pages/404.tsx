import { Pizza } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LuBadgeX } from "react-icons/lu";
import { IoChevronBackCircle } from "react-icons/io5"
import NotFoundSvg from "../assets/not-found.svg"
import { Button } from "@/components/ui/button";


export function NotFound(){

    const navigate = useNavigate()

    function handleDashbordNavigation(){
        navigate('/')
    }

    return(
        <div className="min-h-screen grid grid-cols-2 antialiased">
            <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between">
                <div className="flex items-center gap-3 text-lg font-medium text-foreground">
                    <Pizza className="h-5 w-5" />
                    <span className="font-semibold">pizza.shop</span>
                </div>
                <div className="flex flex-col items-center justify-center mr-16 w-auto h-auto">
                    <img src={NotFoundSvg} alt="Auth Illustration" />
                </div>
                <footer className="text-sm ">
                    Painel  do parceiro &copy; pizza.shop - {new Date().getFullYear()}
                </footer>
            </div>

            <div className="flex flex-col items-center justify-center relative gap-2">
                <h1 className="text-4xl font-bold">Página não encontrada</h1>
                <div className="flex justify-center items-center gap-4 mb-4">
                    <h2 className="text-4xl font-semibold">404</h2>
                    <LuBadgeX className="h-10 w-10"/>
                </div>
                <Button onClick={handleDashbordNavigation}>
                    <p className="flex justify-center items-center text-accent-foreground font-bold">
                        <IoChevronBackCircle  className="mr-2 h-6 w-6"/>
                        Voltar para o Dashboard
                    </p>
                </Button>
            </div>
        </div>
    )
}